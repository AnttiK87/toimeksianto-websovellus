import { UsedCarForm } from '@assignment/shared/index.js';
import { Card } from 'react-bootstrap';

import { serviceTypes } from '../../utils/formOptions.js';

type ServiceRepairInfoProps = {
  data: UsedCarForm;
};

const ServiceRepairInfo: React.FC<ServiceRepairInfoProps> = ({ data }) => {
  if (!data) {
    return <p>Huollon tietoja ei löytynyt.</p>;
  }

  return (
    <Card className="repair-info-card">
      <Card.Body>
        <p>
          Huolto suoritetaan{' '}
          <strong>
            {data.service.type !== null
              ? (serviceTypes.find((s) => s.id === data.service.type)?.label ?? 'Tuntematon')
              : 'Ei määritetty'}
          </strong>{' '}
          mukaisesti.
        </p>

        <p>
          Edellinen huolto suoritettu:{' '}
          <strong>
            {data.serviceHistory.lastServiceDate ? data.serviceHistory.lastServiceDate : '???'}
          </strong>{' '}
          ja{' '}
          <strong>
            {data.serviceHistory.lastService ? data.serviceHistory.lastService : '???'}
          </strong>{' '}
          tkm.
        </p>

        {data.service.type === 1 && (
          <div>
            <strong>Valitut huollot:</strong>

            {data.service.selected.length > 0 ? (
              <ul>
                {data.service.selected.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Ei valittuja huoltoja</p>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ServiceRepairInfo;
