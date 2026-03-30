# Cloud Scanner

A simplified AWS misconfiguration scanner built for small startups and developers who want clear, actionable security insights without the complexity of tools like AWS Security Hub.

## What it does

Scans your AWS account for common security misconfigurations across three categories:

- **S3** — detects publicly accessible buckets
- **IAM** — detects users without MFA enabled  
- **RDS** — detects publicly accessible database instances

Results are displayed in plain English with severity ratings — no AWS expertise required.

## Tech stack

- **Frontend** — React, TypeScript, Tailwind CSS, Zustand, React Router
- **Backend** — Node.js, Express, AWS SDK v3

## Running locally

### Prerequisites
- Node.js 18+
- An AWS account with an IAM user that has read-only permissions

### Backend
```bash
cd cloud-scanner-api
npm install
npm run dev
```

### Frontend
```bash
cd cloud-scanner-ui/frontend
npm install
npm run dev
```

Then open `http://localhost:5173` and enter your AWS Access Key ID and Secret Access Key.

## Security

Credentials are never stored — they are used only for the duration of the scan and discarded when you close the tab.

## Future improvements

- Add more scan categories (CloudTrail, VPC security groups)
- Remediation steps for each finding
- Scan history with PostgreSQL
- Deploy as a hosted service