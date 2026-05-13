import TextAreaField from '../uiComponents/TextAreaField.js';

import type { UsedCarForm } from '../../../../../packages/shared/src/index.js';

interface AdditionalInfoProps {
  formData: UsedCarForm;
  handleChange: (path: string, value: unknown) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ formData, handleChange }) => {
  return (
    <>
      <h2 className="form-section-title">Lisätietoja</h2>
      <TextAreaField
        label="Muita tietoa ajoneuvosta tai korjauksista"
        value={formData.additionalInfo || ''}
        onChange={(v) => handleChange('additionalInfo', v)}
        rows={10}
        custom="text-area info-text"
        customGroup="paint-description-top"
      />
    </>
  );
};

export default AdditionalInfo;
