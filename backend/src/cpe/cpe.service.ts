import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

@Injectable()
export class CpeApiService {
  private NVD_API_CVE = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

  // Fetch all CVE records for a specific CPE name
  async getCveIdsForCpe(cpeName: string, resultsPerPage: number, startIndex: number): Promise<any> {
    try {
      const headers = {
        'User-Agent': 'MyAppName/1.0 ' + process.env.MY_EMAIL,
        'apiKey': process.env.NVD_API_KEY,
        'Accept': 'application/json',
      };

  
      const params = {
        cpeName,         // Use the cpeName parameter here
        resultsPerPage,
        startIndex,
      };
  
      const response = await axios.get(this.NVD_API_CVE, { params, headers });
  
      if (!response.data.vulnerabilities || response.data.vulnerabilities.length === 0) {
        throw new Error('No CVE data found for the provided CPE.');
      }

      // Extract and return only the CVE IDs
      const cveIds = response.data.vulnerabilities.map((vuln: any) => vuln.cve.id || 'Unknown CVE ID');

      return {
        totalResults: response.data.totalResults,
        cveIds,
      };
    } catch (error) {
      if (error.response) {
        console.error('Error Status:', error.response.status);
        console.error('Error Data:', error.response.data);
        console.error('Error Headers:', error.response.headers);
        throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        console.error('Error Message:', error.message);
        throw new Error(`Network Error: ${error.message}`);
      }
    }
  }
}
