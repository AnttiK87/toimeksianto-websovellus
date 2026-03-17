import type { UsedCarForm } from '@shared/index.js';

interface VehiclePdfUploadProps {
  formData: UsedCarForm;
  setFormData: React.Dispatch<React.SetStateAction<UsedCarForm>>;
}

const VehiclePdfUpload: React.FC<VehiclePdfUploadProps> = ({ formData, setFormData }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    const formDataToSend = new FormData();
    formDataToSend.append('file', file);

    try {
      const res = await fetch('/api/parse-vehicle-data', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();

      // Muuntaa dd.mm.yyyy → yyyy-mm-dd
      const isoString = (dateStr: string) => {
        try {
          const [day, month, year] = dateStr.split('.');
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } catch (error) {
          console.error('Error occurred while converting date string:', error);
          return '';
        }
      };

      setFormData((prev) => ({
        ...prev,
        car: {
          ...prev.car,
          makeAndModel: data.model,
          regNum: data.regNumber,
          vin: data.vin,
          mileage: data.mileage,
          regDate: isoString(data.firstRegistration),
        },
        inspection: {
          ...prev.inspection,
          date: isoString(data.nextInspection),
        },
      }));
    } catch (err) {
      console.error('PDF parsing failed', err);
    }
  };

  return (
    <div>
      <label className="button">
        Hae ajoneuvon tiedot PDF-tiedostosta
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

export default VehiclePdfUpload;
