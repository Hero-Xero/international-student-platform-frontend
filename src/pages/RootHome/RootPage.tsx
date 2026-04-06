import { CmsSingleTypePage } from '../../components/CmsSingleTypePage';
import { getHomepage } from '../../services/cmsApi';

export function RootPage() {
    return (
        <CmsSingleTypePage
            fetcher={getHomepage}
            fallbackTitle="Home"
            fallbackSubtitle="Welcome"
        />
    );
}