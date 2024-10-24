// src/api/cve-api.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

@Injectable()
export class CveApiService {
  private NVD_API_CVE = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

  // Fetch CVE details for a specific CVE ID
  async getCveDetails(cveId: string): Promise<any> {
    try {
      const headers = {
        'User-Agent': 'MyAppName/1.0 ' + process.env.MY_EMAIL,
        'apiKey': process.env.NVD_API_KEY,
        'Accept': 'application/json',
      };

      const params = {
        cveId, // Use the cveId parameter here
      };

      const response = await axios.get(this.NVD_API_CVE, { params, headers });

      if (!response.data.vulnerabilities || response.data.vulnerabilities.length === 0) {
        throw new Error(`No details found for the provided CVE ID: ${cveId}.`);
      }

      // Return the full CVE details
      return response.data.vulnerabilities[0];
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
