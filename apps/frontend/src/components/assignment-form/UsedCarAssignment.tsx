import { useState, useEffect } from 'react';

import type { UsedCarForm } from '@shared/index.js';
import { initialUsedCarForm } from './initialUsedCarForm.js';
import { resetTyres } from './formResetters';

import BasinInfo from './BasinInfo.js';
import ElectricCar from './ElectricCar.js';
import Service from './Service.js';
import Tyres from './Tyres.js';
import OtherService from './OtherService.js';
import BodyWork from './BodyWork.js';

import './UsedCarAssignment.css';

const UsedCarAssignment = () => {
  const [formData, setFormData] = useState<UsedCarForm>(initialUsedCarForm);

  const handleChange = (field: keyof UsedCarForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setFormData((prev) => resetTyres(prev));
  }, [formData.tyres.newTyres]);

  return (
    <form className="form-container">
      <h1 className="text-2xl font-bold">Toimeksianto-lomake</h1>
      <div>
        <BasinInfo formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <ElectricCar formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <Tyres formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <Service formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <OtherService formData={formData} handleChange={handleChange} setFormData={setFormData} />
        <BodyWork formData={formData} handleChange={handleChange} setFormData={setFormData} />
      </div>
    </form>
  );
};

export default UsedCarAssignment;
