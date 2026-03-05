import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';

import DateField from './DateField';
import SelectField from './SelectField';
import TextField from './TextField';
import CheckboxField from './CheckboxField';

import './UsedCarAssignment.css';

const UsedCarAssignment = () => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const [date, setDate] = useState<string>(today);
  const [salesMan, setSalesMan] = useState<number | undefined>(undefined);

  const [makeAndModel, setMakeAndModel] = useState<string>('');
  const [regNum, setRegNum] = useState<string>('');
  const [mileage, setMileage] = useState<string>('');
  const [regDate, setRegDate] = useState<string>('');

  const [warranty, setWarranty] = useState(false);
  const [warrantyDate, setWarrantyDate] = useState<string>('');

  const [lastService, setLastService] = useState<string>('');
  const [nextService, setNextService] = useState<string>('');

  const [inspDate, setInspDate] = useState<string>('');
  const [inspNeeded, setInspNeeded] = useState(false);

  const [electric, setElectric] = useState<number | undefined>(undefined);
  const [acPower, setAcPower] = useState<string>('');

  useEffect(() => {
    setWarrantyDate('');
  }, [warranty]); // suoritetaan aina kun isActive muuttuu

  const salesMen = [
    { id: 1, label: 'Juha' },
    { id: 2, label: 'Mika' },
    { id: 3, label: 'Jaakko' },
  ];

  const EcarOpt = [
    { id: 1, label: 'Sähköauto' },
    { id: 2, label: 'Plug-in hybridi' },
    { id: 3, label: 'Täyshybridi' },
    { id: 4, label: 'Kevythybridi' },
  ];

  return (
    <form className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Toimeksianto-lomake</h1>
      <div>
        <DateField label="Toimeksiannon päiväys" value={date} onChange={setDate} />
        <SelectField label="Myyjä" options={salesMen} value={salesMan} onChange={setSalesMan} />
        <TextField label="Auton merkki ja malli" value={makeAndModel} onChange={setMakeAndModel} />
        <TextField label="Rek.nro." value={regNum} onChange={setRegNum} />
        <TextField label="Ajomäärä" value={mileage} onChange={setMileage} />
        <DateField label="Rek.pvm" value={regDate} max={today} onChange={setRegDate} />
        <CheckboxField label="Tehdastakuu voimassa" checked={warranty} onChange={setWarranty} />
        {warranty && (
          <DateField label="asti" value={warrantyDate} min={today} onChange={setWarrantyDate} />
        )}
        <TextField label="Edellinen huolto" value={lastService} onChange={setLastService} />
        <TextField label="Seuraava huolto" value={nextService} onChange={setNextService} />
        <DateField label="Seuraava katsastus" value={inspDate} max={today} onChange={setInspDate} />
        <CheckboxField label="Katsastettava" checked={inspNeeded} onChange={setInspNeeded} />
        <SelectField label="Sähköinen" options={EcarOpt} value={electric} onChange={setElectric} />
        {(electric === 1 || electric === 2) && (
          <TextField label="Sisäinen AC laturin teho:" value={acPower} onChange={setAcPower} />
        )}
      </div>

      {/* Perustiedot */}

      <section className="space-y-4">
        <h2 className="font-semibold">Perustiedot</h2>

        <div>
          <label>Rekisterinumero</label>
          <input type="text" name="reknro" />
        </div>

        <div>
          <label>Vahinkopäivä</label>
          <input type="date" name="vahinkopaiva" />
        </div>

        <div>
          <label>Asiakas</label>
          <input type="text" name="asiakas" />
        </div>

        <div>
          <label>Myynti</label>
          <input type="text" name="myynti" />
        </div>

        <div>
          <label>Omavastuun maksaa</label>
          <input type="text" name="omavastuu" />
        </div>
      </section>

      {/* Huoltotoimenpiteet */}

      <section className="space-y-2">
        <h2 className="font-semibold">Huoltotoimenpiteet</h2>

        <label>
          <input type="checkbox" name="sytytystulpat" />
          Sytytystulppien vaihto
        </label>

        <label>
          <input type="checkbox" name="vaihteistoöljy" />
          Vaihteistoöljyn vaihto
        </label>

        <label>
          <input type="checkbox" name="jarrunesteet" />
          Jarrunesteiden vaihto
        </label>

        <label>
          <input type="checkbox" name="jarruhuolto" />
          Jarruhuolto
        </label>

        <label>
          <input type="checkbox" name="jakohihna" />
          Jakohihna
        </label>

        <label>
          <input type="checkbox" name="jakoketju" />
          Jakoketju
        </label>
      </section>

      {/* Vaihtoväli */}

      <section className="space-y-4">
        <h2 className="font-semibold">Vaihtoväli</h2>

        <div>
          <label>Vaihdettu viimeksi</label>
          <input type="text" name="vaihdettuViimeksi" />
        </div>

        <div>
          <label>Kilometrit</label>
          <input type="number" name="km" />
        </div>

        <div>
          <label>Vuotta</label>
          <input type="number" name="vuotta" />
        </div>

        <div>
          <label>Vuonna</label>
          <input type="number" name="vuonna" />
        </div>
      </section>

      {/* Tarvitseeko korjata */}

      <section>
        <h2 className="font-semibold">Tarvitseeko vaihtaa / korjata?</h2>

        <label>
          <input type="radio" name="korjaus" value="kylla" />
          Kyllä
        </label>

        <label>
          <input type="radio" name="korjaus" value="ei" />
          Ei
        </label>
      </section>

      {/* Renkaat */}

      <section>
        <h2 className="font-semibold">Renkaat</h2>

        <label>
          <input type="radio" name="renkaat" value="nasta" />
          Nasta
        </label>

        <label>
          <input type="radio" name="renkaat" value="kitka" />
          Kitka
        </label>
      </section>

      {/* Vakuutus */}

      <section className="space-y-4">
        <h2 className="font-semibold">Vakuutus</h2>

        <div>
          <label>Vakuutusyhtiö</label>
          <input type="text" name="vakuutus" />
        </div>

        <div>
          <label>Lasivakuutus</label>
          <input type="text" name="lasivakuutus" />
        </div>
      </section>

      {/* Auton vauriot */}

      <section className="space-y-2">
        <h2 className="font-semibold">Auton vauriokohdat</h2>

        <div>
          <label>Auton etuosa</label>
          <textarea name="etuosa" />
        </div>

        <div>
          <label>Auton takaosa</label>
          <textarea name="takaosa" />
        </div>

        <div>
          <label>Vasen sivu</label>
          <textarea name="vasenSivu" />
        </div>

        <div>
          <label>Oikea sivu</label>
          <textarea name="oikeaSivu" />
        </div>

        <div>
          <label>Yläpuoli</label>
          <textarea name="ylapuoli" />
        </div>
      </section>

      {/* Napit */}

      <div className="flex gap-4 pt-4">
        <button type="button">Tulosta maalaussivu</button>

        <button type="submit">Lukitse ja lähetä toimeksianto</button>
      </div>
    </form>
  );
};

export default UsedCarAssignment;
