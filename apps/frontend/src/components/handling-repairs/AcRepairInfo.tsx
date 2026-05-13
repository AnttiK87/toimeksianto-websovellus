import { UsedCarForm } from '@assignment/shared/index.js';
import { Card } from 'react-bootstrap';

import { yesOrNo } from '../../utils/formOptions.js';

type AcRepairInfoProps = {
  data: UsedCarForm;
};

const AcRepairInfo: React.FC<AcRepairInfoProps> = ({ data }) => {
  if (!data) {
    return <p>Huollon tietoja ei löytynyt.</p>;
  }

  return (
    <Card className="repair-info-card">
      <Card.Body>
        <p>Ilmastointi ei toimi ja se vaatii korjausta/huoltoa.</p>
        <p>
          Ilmastoinninhuolto on jo tehty :{' '}
          <strong>
            {data.otherServiceWork.ac.acService !== null
              ? (yesOrNo.find((s) => s.id === data.otherServiceWork.ac.acService)?.label ??
                'Tuntematon')
              : 'Ei määritetty'}
          </strong>
        </p>
      </Card.Body>
    </Card>
  );
};

export default AcRepairInfo;
