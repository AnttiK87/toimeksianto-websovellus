import { UsedCarForm } from '@assignment/shared/index.js';
import { Card } from 'react-bootstrap';

import { windshWorkshops, painters, insuranceCompanies, payers } from '../../utils/formOptions.js';

type WindscreenRepairInfoProps = {
  data: UsedCarForm;
};

const WindscreenRepairInfo: React.FC<WindscreenRepairInfoProps> = ({ data }) => {
  if (!data) {
    return <p>Huollon tietoja ei löytynyt.</p>;
  }

  return (
    <Card className="repair-info-card">
      <Card.Body>
        <p>
          Vaihdetaan:{' '}
          <strong>
            {data.windshield.workshop !== null
              ? (windshWorkshops.find((s) => s.id === data.windshield.workshop)?.label ??
                'Tuntematon')
              : 'Ei määritetty'}
          </strong>
        </p>
        {data.windshield.workshop === 1 && (
          <p>
            Missä: <strong>{data.windshield.subcontractor || 'Ei tiedossa'}</strong>
          </p>
        )}
        <p>
          Lasivakuutus: <strong>{data.windshield.insurance ? 'Kyllä' : 'Ei'}</strong>
        </p>
        {data.windshield.insurance && (
          <>
            <p>
              Vakuutusyhtiö:{' '}
              <strong>
                {data.windshield.insuranceCompany !== null
                  ? (insuranceCompanies.find((s) => s.id === data.windshield.insuranceCompany)
                      ?.label ?? 'Tuntematon')
                  : 'Ei määritetty'}
              </strong>
            </p>
            <p>
              Vahinkopäivä:{' '}
              <strong>
                {data.windshield.damageDate
                  ? new Date(data.windshield.damageDate).toLocaleDateString()
                  : 'Ei tiedossa'}
              </strong>
            </p>
            <p>
              Omavastuu:{' '}
              <strong>
                {data.windshield.changeFee !== null
                  ? `${data.windshield.changeFee} €`
                  : 'Ei määritetty'}
              </strong>
            </p>
            <p>
              Maksaja:{' '}
              <strong>
                {data.windshield.feePayer !== null
                  ? (payers.find((s) => s.id === data.windshield.feePayer)?.label ?? 'Tuntematon')
                  : 'Ei määritetty'}
              </strong>
            </p>
          </>
        )}
        <p>
          Tuulilasin varusteet:{' '}
          <strong>
            {data.windshield.camera && 'Kamera'} {data.windshield.hud && 'HUD'}{' '}
            {data.windshield.heated && 'Lämmitys'}
          </strong>
        </p>
      </Card.Body>
    </Card>
  );
};

export default WindscreenRepairInfo;
