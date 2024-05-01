import { ConfigService } from '@nestjs/config';
import { TopPageService } from './../top-page/top-page.service';
import { Controller, Get, Header } from '@nestjs/common';
import { subDays, format } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constants';

@Controller('sitemap')
export class SitemapController {
  domain: string;

  constructor(
    private readonly topPageService: TopPageService,
    private readonly configService: ConfigService,
  ) {
    this.domain = this.configService.get('DOMAIN') ?? '';
  }

  // Robots crawl the site using Get
  @Get('xml')
  @Header('Content-Type', 'text/xml')
  async sitemap() {
    const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
    let urlsRes = [
      // describing the main page:
      {
        loc: `${this.domain}`,
        lastmod: format(subDays(new Date(), 1), formatString), //
        changefreq: 'daily',
        priority: '1.0',
      },
      // describing the courses page:
      {
        loc: `${this.domain}/courses`,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '0.8',
      },
      //TODO: describe the rest of the pages.
    ];

    const pagesArr = await this.topPageService.getAll();

    urlsRes = urlsRes.concat(
      pagesArr.map((page) => {
        return {
          loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${
            page.alias
          }`,
          lastmod: format(new Date(page.updatedAt) ?? new Date(), formatString),
          changefreq: 'weekly',
          priority: '0.7',
        };
      }),
    );

    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });

    return builder.buildObject({
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
        url: urlsRes,
      },
    });
  }
}
