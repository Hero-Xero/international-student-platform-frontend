import { CmsSingleTypePage } from '../components/CmsSingleTypePage';
import { getContactUs } from '../services/cmsApi';

export function ContactUs() {
  return (
    <CmsSingleTypePage
      fetcher={getContactUs}
      fallbackTitle="Contact Us"
      fallbackSubtitle="Get in touch with our team"
    />
  );
}

