import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { CpeApiService } from './cpe.service';

@Controller('cpe')
export class CpeApiController {
  constructor(private readonly cpeApiService: CpeApiService) {}

  // Fetch only CVE IDs related to a given CPE name
  @Get('cve-for-cpe')
  async getCveIdsForCpe(
    @Query('cpeName') cpeName: string,
    @Query('resultsPerPage') resultsPerPage: number = 100,  // Set the default value for resultsPerPage
    @Query('startIndex') startIndex: number = 0            // Set the default value for startIndex
  ) {
    if (!cpeName) {
      throw new BadRequestException('The "cpeName" query parameter is required.');
    }

    try {
      // Pass the parameters to the service method
      const { totalResults, cveIds } = await this.cpeApiService.getCveIdsForCpe(cpeName, resultsPerPage, startIndex);
      return {
        cpeName,
        totalResults,
        cveIds,  // Return only the CVE IDs
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
