import React, { useState, useEffect } from "react";
import { 
  Activity, Users, Bed, AlertTriangle, Clock, 
  Phone, Heart, Brain, Stethoscope, XCircle,
  CheckCircle, AlertCircle, TrendingUp, Calendar,
  UserCheck, Droplet, Wind, Zap, Bell, MapPin
} from "lucide-react";

export default function HospitalDashboard({ user }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isPaging, setIsPaging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - would come from API in production
  const incomingAlerts = [
    {
      id: "AMB-2401",
      patientName: "John Doe",
      age: 52,
      gender: "M",
      severity: "critical",
      condition: "Cardiac Arrest",
      eta: "4 mins",
      vitals: { hr: 145, bp: "180/110", spo2: 88, temp: 38.2 },
      assignedRoom: "Trauma Bay 2",
      paramedic: "Unit 23-Alpha",
      notes: "CPR in progress, defibrillated x2, IV access established"
    },
    {
      id: "AMB-2402",
      patientName: "Jane Smith",
      age: 34,
      gender: "F",
      severity: "urgent",
      condition: "Motor Vehicle Accident",
      eta: "8 mins",
      vitals: { hr: 98, bp: "130/85", spo2: 95, temp: 37.1 },
      assignedRoom: "ER-5",
      paramedic: "Unit 15-Bravo",
      notes: "Multiple contusions, possible rib fracture, alert and oriented"
    }
  ];

  const criticalCases = [
    {
      id: "ER-9034",
      patientName: "Sarah Johnson",
      age: 45,
      condition: "Acute MI",
      location: "Cath Lab 1",
      admittedTime: "14:15",
      status: "In Procedure",
      assignedDoctor: "Dr. Sarah Miller",
      vitals: { hr: 102, bp: "140/90", spo2: 94 }
    },
    {
      id: "ER-9031",
      patientName: "David Park",
      age: 29,
      condition: "Acute Appendicitis",
      location: "OR-2",
      admittedTime: "13:20",
      status: "Surgery",
      assignedDoctor: "Dr. Elena Rossi",
      vitals: { hr: 88, bp: "118/72", spo2: 99 }
    }
  ];

  const onCallDoctors = [
    {
      name: "Dr. Sarah Miller",
      specialty: "Cardiology",
      status: "busy",
      currentCases: 2,
      phone: "+1-555-0123",
      location: "Cath Lab 1",
      availability: "In Procedure"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Neurology",
      status: "available",
      currentCases: 0,
      phone: "+1-555-0124",
      location: "ER Desk",
      availability: "Available"
    }
  ];

  const bedAvailability = {
    emergency: { available: 4, total: 12, occupied: 8 },
    icu: { available: 2, total: 10, occupied: 8 },
    traumaBay: { available: 1, total: 3, occupied: 2 },
    operatingRoom: { available: 2, total: 5, occupied: 3 },
    neuroBay: { available: 1, total: 2, occupied: 1 },
    pediatric: { available: 5, total: 8, occupied: 3 }
  };

  const resources = [
    { name: "Ventilators", available: 3, total: 8, status: "adequate" },
    { name: "Blood O-", units: 3, critical: 5, status: "critical" },
    { name: "Blood O+", units: 12, critical: 5, status: "good" },
    { name: "Blood A-", units: 6, critical: 5, status: "adequate" },
    { name: "CT Scanner", available: 1, total: 2, status: "high-demand" },
    { name: "MRI", available: 1, total: 1, status: "available" },
    { name: "X-Ray", available: 2, total: 3, status: "available" },
    { name: "Ultrasound", available: 3, total: 4, status: "available" }
  ];

  const referralRequests = [
    {
      id: "REF-401",
      facility: "County General Hospital",
      patient: "Ahmed Hassan",
      reason: "Burn Unit Transfer",
      severity: "urgent",
      status: "pending",
      requestedTime: "14:20"
    }
  ];

  // Helper function to suggest which team to page based on condition
  const suggestTeam = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('cardiac') || conditionLower.includes('heart') || conditionLower.includes('mi')) {
      return 'Cardiology';
    }
    if (conditionLower.includes('stroke') || conditionLower.includes('neuro') || conditionLower.includes('brain')) {
      return 'Neurology';
    }
    if (conditionLower.includes('trauma') || conditionLower.includes('accident') || conditionLower.includes('injury')) {
      return 'Trauma';
    }
    return 'ER Team';
  };

  // Function to show notifications
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Function to page a specific team
  const pageTeam = async (teamName, patientInfo = null) => {
    setIsPaging(true);
    
    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would be:
      // await fetch('/api/page-team', {
      //   method: 'POST',
      //   body: JSON.stringify({ team: teamName, patient: patientInfo })
      // });
      
      const message = patientInfo 
        ? `${teamName} paged for ${patientInfo.patientName} (${patientInfo.condition})`
        : `${teamName} paged successfully`;
      
      showNotification(message, 'success');
      console.log('Team paged:', teamName, patientInfo);
    } catch (error) {
      showNotification('Failed to page team. Please try again.', 'error');
      console.error('Error paging team:', error);
    } finally {
      setIsPaging(false);
    }
  };

  // Function to handle Code Blue (page all teams)
  const handleCodeBlue = async () => {
    if (window.confirm('⚠️ Activate Code Blue and page ALL teams?')) {
      setIsPaging(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        showNotification('🚨 CODE BLUE ACTIVATED - All teams paged!', 'warning');
        console.log('CODE BLUE activated');
      } catch (error) {
        showNotification('Failed to activate Code Blue', 'error');
      } finally {
        setIsPaging(false);
      }
    }
  };

  // Function to handle emergency calls
  const handleEmergencyCall = (type) => {
    showNotification(`Calling ${type}...`, 'info');
    console.log(`Emergency call initiated: ${type}`);
    // In production: window.location.href = 'tel:emergency-number'
  };

  // Function to handle transfer request
  const handleTransferRequest = () => {
    showNotification('Transfer request form opened', 'info');
    console.log('Transfer request initiated');
    // In production: open transfer request modal/form
  };

  // Function to confirm room assignment
  const confirmAssignment = (alert) => {
    showNotification(`${alert.patientName} confirmed for ${alert.assignedRoom}`, 'success');
    console.log('Assignment confirmed:', alert);
    setSelectedAlert(null);
  };

  // Function to reassign room
  const reassignRoom = (alert) => {
    const newRoom = prompt('Enter new room assignment:', alert.assignedRoom);
    if (newRoom) {
      showNotification(`${alert.patientName} reassigned to ${newRoom}`, 'success');
      console.log('Room reassigned:', alert, 'to', newRoom);
    }
  };

  const stats = {
    totalIncoming: incomingAlerts.length,
    criticalCount: incomingAlerts.filter(a => a.severity === "critical").length + criticalCases.length,
    avgTriageTime: "14m",
    patientIntake24h: 47,
    availableBeds: Object.values(bedAvailability).reduce((sum, bed) => sum + bed.available, 0),
    totalBeds: Object.values(bedAvailability).reduce((sum, bed) => sum + bed.total, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      
      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`rounded-lg shadow-2xl p-4 min-w-[300px] max-w-md ${
            notification.type === 'success' ? 'bg-green-600' :
            notification.type === 'error' ? 'bg-red-600' :
            notification.type === 'warning' ? 'bg-yellow-600' :
            'bg-blue-600'
          } text-white`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <CheckCircle className="w-6 h-6" />}
                {notification.type === 'error' && <XCircle className="w-6 h-6" />}
                {notification.type === 'warning' && <AlertTriangle className="w-6 h-6" />}
                {notification.type === 'info' && <Bell className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* HEADER */}
      <header className="bg-white rounded-xl shadow-lg p-5 mb-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-600 p-2.5 rounded-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Emergency Room Dashboard</h1>
                <p className="text-sm text-gray-500">Central General Hospital • Level 1 Trauma Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 ml-14">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
              </div>
              <span>•</span>
              <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => handleEmergencyCall('EMS Dispatch')}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call EMS Dispatch
            </button>
            <button 
              onClick={handleTransferRequest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Transfer Request
            </button>
            <button 
              onClick={handleCodeBlue}
              disabled={isPaging}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              {isPaging ? 'Paging...' : 'Emergency Code'}
            </button>
            
            {/* User Profile */}
            {user && (
              <div className="ml-2 flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-lg border-2 border-slate-300">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.role} • {user.shift}</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-5">
          <KPICard 
            icon={<TrendingUp className="w-5 h-5" />}
            label="Incoming"
            value={stats.totalIncoming}
            subtitle="En route now"
            color="blue"
          />
          <KPICard 
            icon={<AlertTriangle className="w-5 h-5" />}
            label="Critical"
            value={stats.criticalCount}
            subtitle="Need attention"
            color="red"
            pulse
          />
          <KPICard 
            icon={<Bed className="w-5 h-5" />}
            label="Beds Available"
            value={`${stats.availableBeds}/${stats.totalBeds}`}
            subtitle="All departments"
            color="green"
          />
          <KPICard 
            icon={<Users className="w-5 h-5" />}
            label="Active Patients"
            value={criticalCases.length}
            subtitle="In treatment"
            color="purple"
          />
          <KPICard 
            icon={<Clock className="w-5 h-5" />}
            label="Avg Triage"
            value={stats.avgTriageTime}
            subtitle="Target: <15m"
            color="yellow"
          />
          <KPICard 
            icon={<Calendar className="w-5 h-5" />}
            label="24h Intake"
            value={stats.patientIntake24h}
            subtitle="Last 24 hours"
            color="indigo"
          />
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LEFT COLUMN (2/3) */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* INCOMING ALERTS */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <AlertTriangle className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Incoming Alerts</h2>
                  <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {incomingAlerts.length} En Route
                  </span>
                </div>
                <span className="text-xs text-red-100 uppercase tracking-wide">Real-time</span>
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              {incomingAlerts.map((alert) => (
                <IncomingAlertCard 
                  key={alert.id}
                  alert={alert}
                  onClick={() => setSelectedAlert(alert)}
                  isSelected={selectedAlert?.id === alert.id}
                  suggestTeam={suggestTeam}
                />
              ))}
            </div>
          </section>

          {/* CRITICAL CASES IN TREATMENT */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-5 py-4">
              <div className="flex items-center gap-2 text-white">
                <Heart className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Critical Cases in Treatment</h2>
                <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {criticalCases.length} Active
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Case ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Condition</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vitals</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {criticalCases.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-blue-600">{patient.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p className="font-medium text-gray-800">{patient.patientName}</p>
                          <p className="text-xs text-gray-500">{patient.age} years • {patient.admittedTime}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-700">{patient.condition}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          <Bed className="w-3 h-3" />
                          {patient.location}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{patient.assignedDoctor}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 text-xs">
                          <span className="text-gray-600">HR: <strong>{patient.vitals.hr}</strong></span>
                          <span className="text-gray-600">SpO2: <strong>{patient.vitals.spo2}%</strong></span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={patient.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* BED AVAILABILITY */}
          <section className="bg-white rounded-xl shadow-lg p-5">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bed className="w-5 h-5 text-blue-600" />
              Bed Availability by Department
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BedAvailabilityCard 
                department="Emergency Room"
                available={bedAvailability.emergency.available}
                total={bedAvailability.emergency.total}
                icon={<Stethoscope className="w-5 h-5" />}
              />
              <BedAvailabilityCard 
                department="ICU"
                available={bedAvailability.icu.available}
                total={bedAvailability.icu.total}
                icon={<Heart className="w-5 h-5" />}
              />
              <BedAvailabilityCard 
                department="Trauma Bay"
                available={bedAvailability.traumaBay.available}
                total={bedAvailability.traumaBay.total}
                icon={<AlertCircle className="w-5 h-5" />}
              />
              <BedAvailabilityCard 
                department="Operating Room"
                available={bedAvailability.operatingRoom.available}
                total={bedAvailability.operatingRoom.total}
                icon={<Activity className="w-5 h-5" />}
              />
              <BedAvailabilityCard 
                department="Neuro Bay"
                available={bedAvailability.neuroBay.available}
                total={bedAvailability.neuroBay.total}
                icon={<Brain className="w-5 h-5" />}
              />
              <BedAvailabilityCard 
                department="Pediatric"
                available={bedAvailability.pediatric.available}
                total={bedAvailability.pediatric.total}
                icon={<Users className="w-5 h-5" />}
              />
            </div>
          </section>

          {/* RESOURCES */}
          <section className="bg-white rounded-xl shadow-lg p-5">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Resource Availability
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, idx) => (
                <ResourceAvailability key={idx} resource={resource} />
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (1/3) */}
        <div className="space-y-5">
          
          {/* ON-CALL DOCTORS */}
          <section className="bg-gradient-to-br from-indigo-700 to-indigo-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                On-Call Medical Staff
              </h2>
            </div>

            <div className="p-4 space-y-2.5 max-h-[600px] overflow-y-auto">
              {onCallDoctors.map((doctor, idx) => (
                <DoctorCard key={idx} doctor={doctor} />
              ))}
            </div>

            <div className="p-4 border-t border-white/10 space-y-2">
              <p className="text-xs text-indigo-200 mb-2">Quick Page by Specialty:</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => pageTeam('Cardiology')}
                  disabled={isPaging}
                  className="bg-red-600 hover:bg-red-500 disabled:bg-red-400 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Heart className="w-3 h-3" />
                  Cardiology
                </button>
                <button 
                  onClick={() => pageTeam('Neurology')}
                  disabled={isPaging}
                  className="bg-purple-600 hover:bg-purple-500 disabled:bg-purple-400 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Brain className="w-3 h-3" />
                  Neurology
                </button>
                <button 
                  onClick={() => pageTeam('Trauma')}
                  disabled={isPaging}
                  className="bg-orange-600 hover:bg-orange-500 disabled:bg-orange-400 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Activity className="w-3 h-3" />
                  Trauma
                </button>
                <button 
                  onClick={() => pageTeam('ER Team')}
                  disabled={isPaging}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Stethoscope className="w-3 h-3" />
                  ER Team
                </button>
              </div>
              <button 
                onClick={handleCodeBlue}
                disabled={isPaging}
                className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-yellow-400 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <AlertTriangle className="w-4 h-4" />
                {isPaging ? 'Paging...' : 'Code Blue - All Teams'}
              </button>
            </div>
          </section>

          {/* REFERRAL REQUESTS */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-5 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Referral Requests
              </h2>
            </div>

            <div className="p-4 space-y-3">
              {referralRequests.map((referral) => (
                <ReferralCard key={referral.id} referral={referral} />
              ))}
              
              <button className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 py-2.5 rounded-lg font-medium transition-colors border border-teal-200">
                + New Referral Request
              </button>
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="bg-white rounded-xl shadow-lg p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
            <div className="space-y-2">
              <QuickActionButton 
                label="Request Blood Products"
                icon={<Droplet className="w-4 h-4" />}
                color="red"
              />
              <QuickActionButton 
                label="Page Specialist"
                icon={<Phone className="w-4 h-4" />}
                color="blue"
              />
              <QuickActionButton 
                label="Activate Trauma Code"
                icon={<AlertTriangle className="w-4 h-4" />}
                color="orange"
              />
              <QuickActionButton 
                label="Request Imaging"
                icon={<Activity className="w-4 h-4" />}
                color="purple"
              />
              <QuickActionButton 
                label="Transfer Patient"
                icon={<Users className="w-4 h-4" />}
                color="indigo"
              />
            </div>
          </section>

          {/* CAPACITY OVERVIEW */}
          <section className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg p-5 text-white">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Capacity Overview
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Current Occupancy</span>
                <span className="text-xl font-bold">68%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '68%' }} />
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div>
                  <p className="text-xs text-slate-400">Projected (2h)</p>
                  <p className="text-lg font-semibold">75%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Peak Today</p>
                  <p className="text-lg font-semibold">18:00</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs text-slate-400 mb-1">Today's Trend</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300">Steady flow, no major incidents expected</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* SELECTED ALERT MODAL */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedAlert(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedAlert.patientName}</h3>
                <p className="text-sm text-gray-500">{selectedAlert.id} • {selectedAlert.age} years old • {selectedAlert.gender}</p>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-5">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Patient Details</h4>
                <div className="space-y-2 text-sm">
                  <DetailRow label="Condition" value={selectedAlert.condition} />
                  <DetailRow label="Severity" value={
                    <SeverityBadge severity={selectedAlert.severity} />
                  } />
                  <DetailRow label="ETA" value={selectedAlert.eta} highlight />
                  <DetailRow label="Ambulance" value={selectedAlert.id} />
                  <DetailRow label="Paramedic Unit" value={selectedAlert.paramedic} />
                  <DetailRow label="Assigned Room" value={selectedAlert.assignedRoom} />
                </div>
                
                {/* Recommended Team Alert */}
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                  <p className="text-xs font-semibold text-blue-700 mb-1">Recommended Team:</p>
                  <p className="text-sm font-medium text-blue-900">{suggestTeam(selectedAlert.condition)}</p>
                  <button 
                    onClick={() => pageTeam(suggestTeam(selectedAlert.condition), selectedAlert)}
                    disabled={isPaging}
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs py-2 rounded font-medium transition-colors"
                  >
                    {isPaging ? 'Paging...' : `Page ${suggestTeam(selectedAlert.condition)} Now`}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Live Vitals</h4>
                <div className="space-y-2">
                  <VitalDisplay 
                    label="Heart Rate" 
                    value={`${selectedAlert.vitals.hr} bpm`}
                    status={selectedAlert.vitals.hr > 100 ? "warning" : "normal"}
                  />
                  <VitalDisplay 
                    label="Blood Pressure" 
                    value={selectedAlert.vitals.bp}
                    status={selectedAlert.vitals.bp.startsWith("180") ? "critical" : "normal"}
                  />
                  <VitalDisplay 
                    label="SpO2" 
                    value={`${selectedAlert.vitals.spo2}%`}
                    status={selectedAlert.vitals.spo2 < 90 ? "critical" : "normal"}
                  />
                  <VitalDisplay 
                    label="Temperature" 
                    value={`${selectedAlert.vitals.temp}°C`}
                    status="normal"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="font-semibold text-gray-700 mb-2">Paramedic Notes</h4>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r">
                <p className="text-sm text-gray-700">{selectedAlert.notes}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => confirmAssignment(selectedAlert)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Confirm Assignment
              </button>
              <button 
                onClick={() => reassignRoom(selectedAlert)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
              >
                Reassign Room
              </button>
              <button 
                onClick={() => pageTeam(suggestTeam(selectedAlert.condition), selectedAlert)}
                disabled={isPaging}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {isPaging ? 'Paging...' : 'Page Team'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== COMPONENTS ==================== */

function KPICard({ icon, label, value, subtitle, color, pulse }) {
  return (
    <div className={`bg-white rounded-lg p-4 shadow border-l-4 border-${color}-500 ${pulse ? 'animate-pulse' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`text-${color}-600`}>{icon}</div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <p className="text-xs font-semibold text-gray-700 mb-0.5">{label}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function IncomingAlertCard({ alert, onClick, isSelected, suggestTeam }) {
  const severityConfig = {
    critical: { 
      bg: 'bg-red-50', 
      border: 'border-red-500', 
      badge: 'bg-red-600',
      text: 'text-red-700'
    },
    urgent: { 
      bg: 'bg-orange-50', 
      border: 'border-orange-500', 
      badge: 'bg-orange-600',
      text: 'text-orange-700'
    },
    moderate: { 
      bg: 'bg-yellow-50', 
      border: 'border-yellow-500', 
      badge: 'bg-yellow-600',
      text: 'text-yellow-700'
    }
  };

  const config = severityConfig[alert.severity];

  return (
    <div 
      onClick={onClick}
      className={`${config.bg} border-l-4 ${config.border} p-4 rounded-lg cursor-pointer hover:shadow-md transition-all ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-800">{alert.patientName}</h3>
            <span className={`${config.badge} text-white px-2 py-0.5 rounded text-xs font-semibold uppercase`}>
              {alert.severity}
            </span>
            <span className="text-xs text-gray-500">{alert.age}y • {alert.gender}</span>
          </div>
          <p className={`text-sm font-medium ${config.text}`}>{alert.condition}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-red-600">{alert.eta}</p>
          <p className="text-xs text-gray-500">ETA</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex gap-4 text-xs text-gray-600">
          <span>HR: <strong className={alert.vitals.hr > 100 ? 'text-red-600' : ''}>{alert.vitals.hr}</strong></span>
          <span>BP: <strong>{alert.vitals.bp}</strong></span>
          <span>SpO2: <strong className={alert.vitals.spo2 < 90 ? 'text-red-600' : ''}>{alert.vitals.spo2}%</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">
            {suggestTeam(alert.condition)}
          </span>
          <span className="text-sm font-medium text-blue-600">
            → {alert.assignedRoom}
          </span>
        </div>
      </div>
    </div>
  );
}

function BedAvailabilityCard({ department, available, total, icon }) {
  const percentage = (available / total) * 100;
  const getColor = () => {
    if (percentage > 50) return 'green';
    if (percentage > 20) return 'yellow';
    return 'red';
  };
  const color = getColor();

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`text-${color}-600`}>{icon}</div>
          <div>
            <h3 className="font-semibold text-gray-800">{department}</h3>
            <p className="text-xs text-gray-500">Bed Capacity</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">{available}</p>
          <p className="text-xs text-gray-500">of {total}</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`bg-${color}-500 h-2.5 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-600 mt-2">{Math.round(percentage)}% available</p>
    </div>
  );
}

function ResourceAvailability({ resource }) {
  const getStatus = () => {
    if (resource.status === "critical") return { color: "red", label: "Critical Low" };
    if (resource.status === "high-demand") return { color: "orange", label: "High Demand" };
    if (resource.status === "adequate") return { color: "yellow", label: "Adequate" };
    if (resource.status === "good") return { color: "green", label: "Good Stock" };
    return { color: "green", label: "Available" };
  };

  const status = getStatus();

  return (
    <div className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-800 text-sm">{resource.name}</span>
        <span className={`px-2 py-0.5 rounded text-xs font-medium bg-${status.color}-100 text-${status.color}-700`}>
          {status.label}
        </span>
      </div>
      {resource.units !== undefined ? (
        <p className="text-sm text-gray-600">
          <strong>{resource.units}</strong> units {resource.critical && `(min: ${resource.critical})`}
        </p>
      ) : (
        <p className="text-sm text-gray-600">
          <strong>{resource.available}</strong> of {resource.total} available
        </p>
      )}
    </div>
  );
}

function DoctorCard({ doctor }) {
  const statusConfig = {
    available: { dot: "bg-green-400", text: "Available" },
    busy: { dot: "bg-yellow-400", text: "Busy" },
    critical: { dot: "bg-red-400", text: "In Emergency" }
  };

  const config = statusConfig[doctor.status];

  return (
    <div className="bg-white/10 hover:bg-white/15 rounded-lg p-3 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p className="font-semibold text-white">{doctor.name}</p>
          <p className="text-xs text-indigo-200">{doctor.specialty}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`w-3 h-3 rounded-full ${config.dot}`} />
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white">
            {doctor.currentCases} case{doctor.currentCases !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div className="text-xs text-indigo-200 space-y-1">
        <p>📍 {doctor.location}</p>
        <p>📞 {doctor.phone}</p>
        <p className="text-white font-medium">{doctor.availability}</p>
      </div>
    </div>
  );
}

function ReferralCard({ referral }) {
  const severityColors = {
    critical: "red",
    urgent: "orange",
    moderate: "yellow"
  };

  const statusColors = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
    accepted: { bg: "bg-green-100", text: "text-green-700", label: "Accepted" },
    rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" }
  };

  const severityColor = severityColors[referral.severity];
  const statusConfig = statusColors[referral.status];

  return (
    <div className="border-2 border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-gray-800 text-sm">{referral.facility}</p>
          <p className="text-xs text-gray-600">{referral.patient}</p>
        </div>
        <span className={`${statusConfig.bg} ${statusConfig.text} px-2 py-0.5 rounded text-xs font-medium`}>
          {statusConfig.label}
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-2">{referral.reason}</p>
      
      <div className="flex justify-between items-center text-xs">
        <span className={`bg-${severityColor}-100 text-${severityColor}-700 px-2 py-0.5 rounded font-medium`}>
          {referral.severity.toUpperCase()}
        </span>
        <span className="text-gray-500">{referral.requestedTime}</span>
      </div>
    </div>
  );
}

function QuickActionButton({ label, icon, color }) {
  return (
    <button className={`w-full bg-${color}-50 hover:bg-${color}-100 text-${color}-700 py-2.5 px-4 rounded-lg font-medium transition-colors border border-${color}-200 flex items-center gap-2 justify-center`}>
      {icon}
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    "In Procedure": { bg: "bg-blue-100", text: "text-blue-700" },
    "Surgery": { bg: "bg-purple-100", text: "text-purple-700" },
    "Ventilated": { bg: "bg-red-100", text: "text-red-700" },
    "Monitoring": { bg: "bg-yellow-100", text: "text-yellow-700" },
    "Stabilizing": { bg: "bg-orange-100", text: "text-orange-700" }
  };

  const config = statusConfig[status] || { bg: "bg-gray-100", text: "text-gray-700" };

  return (
    <span className={`inline-flex items-center ${config.bg} ${config.text} px-2.5 py-1 rounded-md text-xs font-medium`}>
      {status}
    </span>
  );
}

function SeverityBadge({ severity }) {
  const config = {
    critical: { bg: "bg-red-600", text: "text-white" },
    urgent: { bg: "bg-orange-600", text: "text-white" },
    moderate: { bg: "bg-yellow-600", text: "text-white" }
  };

  const { bg, text } = config[severity];

  return (
    <span className={`${bg} ${text} px-2.5 py-1 rounded text-xs font-semibold uppercase`}>
      {severity}
    </span>
  );
}

function VitalDisplay({ label, value, status }) {
  const statusConfig = {
    critical: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" },
    warning: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
    normal: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" }
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} border ${config.border} p-2.5 rounded flex justify-between items-center`}>
      <span className="text-sm text-gray-700">{label}</span>
      <span className={`font-bold ${config.text}`}>{value}</span>
    </div>
  );
}

function DetailRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
      <span className="text-gray-600">{label}:</span>
      <span className={`font-medium ${highlight ? 'text-red-600 text-lg' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}