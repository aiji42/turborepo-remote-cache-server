import { IArtifactStorage, IArtifactStorageSetParams } from '../lib/interfaces/artifact-storage.interface';
import { Storage } from '@google-cloud/storage';

export class GoogleCloudStorage implements IArtifactStorage {
  private readonly storageClient: Storage;
  private readonly bucketName: string;

  constructor({ bucketName }: { bucketName: string }) {
    if (!bucketName) {
      throw new Error('bucket name are required for Google Cloud Storage');
    }

    this.storageClient = new Storage();
    this.bucketName = bucketName;

    this.initBucket();
  }

  async initBucket(): Promise<void> {
    const bucket = this.storageClient.bucket(this.bucketName);
    const [bucketExists] = await bucket.exists();

    if (!bucketExists) {
      await this.storageClient.createBucket(this.bucketName);
    }
  }

  async get(hash: string): Promise<Buffer | undefined> {
    const bucket = this.storageClient.bucket(this.bucketName);
    const artifactFile = bucket.file(hash);
    const artifact = await artifactFile.download();

    return artifact[0];
  }

  async set({ hash, content }: IArtifactStorageSetParams): Promise<void> {
    const bucket = this.storageClient.bucket(this.bucketName);
    const artifactFile = bucket.file(hash);
    await artifactFile.save(content);
  }
}
