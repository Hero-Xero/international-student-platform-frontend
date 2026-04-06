import { CmsSingleTypePage } from '../../components/CmsSingleTypePage';
import { getAcademics } from '../../services/cmsApi';

export function Academics() {
  return (
    <CmsSingleTypePage
      fetcher={getAcademics}
      fallbackTitle="Academics"
      fallbackSubtitle="Explore academic programs and guidance"
    />
  );
}

