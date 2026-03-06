useEffect(() => {
  setWarrantyDate('');
}, [warranty]);

useEffect(() => {
  if (!electric || electric === 3 || electric === 4) {
    setAcPower('');
    setDcPower('');
    setRange('');
    setCapasitGross('');
    setCapasitNet('');
    setChargCable('');
    setUsedStandard(null);
  }
}, [electric]);

useEffect(() => {
  setBalancingWheels(null);
}, [balancingNeeded]);

useEffect(() => {
  setUsedTyreState(null);
  setStorage('');
  setUsedTyre('');
}, [usedTyresChecked]);

useEffect(() => {
  setStorage('');
  setUsedTyre('');
}, [usedTyreState]);

useEffect(() => {
  setServiceType(null);
  setSelectedServices([]);
}, [serviceNeeded]);

useEffect(() => {
  setBeltChangeKm('');
  setBeltChangetime('');
  setLastBeltChangeKm('');
  setLastBeltChangetime('');
  setBeltChange(null);
  setChainChange(null);
}, [timingType]);
