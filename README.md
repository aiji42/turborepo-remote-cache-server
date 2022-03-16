# Turborepo-Remote-Caching-Server
 Turborepo Remote Caching Server With Support for Disk Storage , AWS S3, Google Cloud Storage, Azure Buckets

## Todos
- Azure
- Docs
- Dockerfile

```bash
docker build -t turborepo/turborepo-remote-cache-server
docker tag turborepo/turborepo-remote-cache-server gcr.io/xxxxxxx/turborepo/turborepo-remote-cache-server:x.x
docker push gcr.io/xxxxxxx/turborepo/turborepo-remote-cache-server:x.x

gcloud run deploy turborepo-cache-server \
  --image=gcr.io/xxxxxxx/turborepo/turborepo-remote-cache-server:x.x \
  --port=3000 --region=asia-northeast1 --allow-unauthenticated --platform=managed \
  --service-account=object.managable@xxxxxxxx.iam.gserviceaccount.com \
  --set-env-vars TOKEN=xxxxxxxx \
  --set-env-vars STORAGE_TYPE=GCS \
  --set-env-vars GOOGLE_CLOUD_BUCKET_NAME=turborepo-remote-cache
```