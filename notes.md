## Key Technologies in this Architecture:
- Frontend: Next.js (React framework for SSR and static pages).
- Backend: NestJS (Modular, scalable, TypeScript-based framework).
- Database: PostgreSQL (Relational database for managing structured data).
- ORM: Prisma (Type-safe ORM for database interactions).
- Caching: Redis (for improving performance and reducing database load).
- Authentication: NextAuth.js or Auth0 (for handling user authentication and role-based access).
- API Integration: NVD API (to fetch CVE data).


## Different CPE-names:
- cpe:2.3:o:schneider-electric:modicon_m580_firmware:-:*:*:*:*:*:*:*
- cpe:2.3:a:rockwellautomation:thinmanager_thinserver:13.1.0:*:*:*:*:*:*:*


Localhost to CVE:s based on a given CPE: http://localhost:3000/cpe/cve-for-cpe?cpeName=cpe:2.3:o:schneider-electric:modicon_m580_firmware:-:*:*:*:*:*:*:*
Localhost to get CVE details based on CVEid: http://localhost:3000/cve/cve-details?cveId=CVE-2019-1010218  