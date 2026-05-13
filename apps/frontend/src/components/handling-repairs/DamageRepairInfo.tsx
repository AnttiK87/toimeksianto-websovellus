import { UsedCarForm } from '@assignment/shared/index.js';
import { Card } from 'react-bootstrap';

import { repairTypes, painters, insuranceCompanies, payers } from '../../utils/formOptions.js';

type DamageRepairInfoProps = {
  data: UsedCarForm;
};

const DamageRepairInfo: React.FC<DamageRepairInfoProps> = ({ data }) => {
  if (!data) {
    return <p>Huollon tietoja ei löytynyt.</p>;
  }

  return (
    <Card className="repair-info-card">
      <Card.Body>
        <p>
          Korjaus tehdään:{' '}
          <strong>
            {data.damage.repairType !== null
              ? (repairTypes.find((s) => s.id === data.damage.repairType)?.label ?? 'Tuntematon')
              : 'Ei määritetty'}
          </strong>{' '}
          työnä.
        </p>
        {data.damage.repairType === 1 ? (
          <p>
            Maalari:{' '}
            <strong>
              {data.damage.painter !== null
                ? (painters.find((s) => s.id === data.damage.painter)?.label ?? 'Tuntematon')
                : 'Ei määritetty'}
            </strong>
          </p>
        ) : (
          <>
            <p>
              Vakuutusyhtiö:{' '}
              <strong>
                {data.damage.insuranceCompany !== null
                  ? (insuranceCompanies.find((s) => s.id === data.damage.insuranceCompany)?.label ??
                    'Tuntematon')
                  : 'Ei määritetty'}
              </strong>
            </p>
            <p>
              vahinkotunnus:{' '}
              <strong>{data.damage.damageId ? `${data.damage.damageId} €` : 'Ei tiedossa'}</strong>
            </p>
            <p>
              Vahinkopäivä:{' '}
              <strong>
                {data.damage.damageDate
                  ? new Date(data.damage.damageDate).toLocaleDateString()
                  : 'Ei tiedossa'}
              </strong>
            </p>
            <p>
              Omavastuu:{' '}
              <strong>
                {data.damage.repairFee !== null ? `${data.damage.repairFee} €` : 'Ei määritetty'}
              </strong>
            </p>
            <p>
              Maksaja:{' '}
              <strong>
                {data.damage.feePayer !== null
                  ? (payers.find((s) => s.id === data.damage.feePayer)?.label ?? 'Tuntematon')
                  : 'Ei määritetty'}
              </strong>
            </p>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default DamageRepairInfo;
