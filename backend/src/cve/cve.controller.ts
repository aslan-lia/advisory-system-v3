// src/api/cve-api.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { CveApiService } from './cve.service';

@Controller('cve')
export class CveApiController {
  constructor(private readonly cveApiService: CveApiService) {}

  // Fetch details for a given CVE ID
  @Get('cve-details')
  async getCveDetails(@Query('cveId') cveId: string) {
    if (!cveId) {
      throw new BadRequestException('The "cveId" query parameter is required.');
    }

    try {
      // Call the service to retrieve CVE details
      const cveDetails = await this.cveApiService.getCveDetails(cveId);
      return {
        cveId,
        cveDetails, // Return the full details for the given CVE ID
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
