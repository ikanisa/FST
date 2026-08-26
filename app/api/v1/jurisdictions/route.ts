import { jurisdictionCodes, jurisdictionConfig } from "../../../../lib/jurisdictions";

export async function GET() {
  return Response.json({
    data: jurisdictionCodes.map((code) => {
      const config = jurisdictionConfig[code];
      return {
        code: config.code,
        name: config.name,
        country: config.country,
        locale: config.locale,
        currency: config.currency,
        timezone: config.timezone,
        callingCode: config.callingCode,
        contact: {
          email: config.contactEmail || null,
          whatsappDisplay: config.whatsappDisplay || null,
          whatsappUrl: config.whatsappUrl || null,
        },
        routes: {
          home: `/${code}`,
          services: `/${code}/services`,
          catalogue: `/${code}/services/catalogue`,
          contact: `/${code}/contact`,
          booking: `/${code}/book`,
        },
      };
    }),
  }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } });
}
