import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const TODAY = "2026-07-28";
const PHONE_DISPLAY = "(463) 248-8429";
const PHONE_LINK = "+14632488429";
const BOOKING_URL = "https://online-booking.workiz.com/?ac=15ab9daf88d12ad393d83f0f3c762b884cd0200e5775f1427d547de24cac55a4";
const CITY_SLUGS = ["carmel", "fishers", "westfield", "noblesville", "mccordsville", "zionsville"];
const SERVICE_SLUGS = ["refrigerator", "washer", "dryer", "dishwasher", "stove", "microwave", "cooktop", "freezer"];
const BLOG_ARCHIVES = ["blog.html", ...Array.from({ length: 9 }, (_, index) => `blog-page-${index + 2}.html`)];
const BLOG_ARTICLES = [
  "10-warning-signs-your-refrigerator.html",
  "blog-dishwasher-cleaning-problems.html",
  "blog-dryer-vent-safety.html",
  "blog-freezer-frost-problems.html",
  "blog-microwave-repair-guide.html",
  "blog-refrigerator-maintenance.html",
  "blog-repair-vs-replacement.html",
  "blog-stove-burner-repair.html",
  "blog-washer-drain-problems.html",
  "finding-reliable-microwave-repair-near-carmel-what-to-look-for.html",
  "how-to-spot-and-fix-an-overworking-refrigerator-before-your-energy-bill-skyrockets.html",
  "keeping-your-cool-why-timely-refrigerator-repair-is-crucial-in-carmel.html",
  "keeping-your-home-running-smoothly-why-choose-a-local-appliance-repair-expert.html",
  "signs-your-dryer-needs-repairs-before-it-breaks-down.html",
  "top-5-common-microwave-problems-and-how-to-fix-them.html",
  "top-5-most-common-refrigerator-issues.html"
];
const ARTICLE_HERO_OVERRIDES = {
  "keeping-your-cool-why-timely-refrigerator-repair-is-crucial-in-carmel.html": "images/refrigerator-repair.webp",
  "keeping-your-home-running-smoothly-why-choose-a-local-appliance-repair-expert.html": "images/service-maintenance-worker-repairing.webp"
};
const INFORMATION_PAGES = ["about.html", "services.html", "locations.html", "contacts.html", "brands.html"];
const CORE_SERVICE_PAGES = SERVICE_SLUGS.map((serviceSlug) => `${serviceSlug}-repair.html`);
const UNIFIED_PAGE_PATHS = new Set([...CORE_SERVICE_PAGES, ...INFORMATION_PAGES, ...BLOG_ARCHIVES, ...BLOG_ARTICLES]);

const carmelCompletedRepairs = [
  {
    image: "carmel-completed-repair-27.webp",
    title: "Freezer evaporator fan motor replacement",
    alt: "Freezer evaporator fan motor replacement for a Carmel appliance repair customer"
  },
  {
    image: "carmel-completed-repair-31.webp",
    title: "Dishwasher fill funnel replacement for a water leak",
    alt: "Dishwasher fill funnel replacement for a Carmel appliance repair customer with a water leak"
  },
  {
    image: "carmel-completed-repair-32.webp",
    title: "KitchenAid refrigerator door switch replacement",
    alt: "KitchenAid refrigerator door switch replacement for a Carmel appliance repair customer"
  },
  {
    image: "carmel-completed-repair-36.webp",
    title: "Appliance wiring harness and connector inspection",
    alt: "Appliance wiring harness and connector inspection for a Carmel repair customer"
  },
  {
    image: "carmel-completed-repair-38.webp",
    title: "Range control panel wiring diagnosis",
    alt: "Range control panel wiring diagnosis for a Carmel appliance repair customer"
  },
  {
    image: "carmel-completed-repair-41.webp",
    title: "Refrigerator temperature verification after service",
    alt: "Refrigerator temperature verification after service for a Carmel appliance repair customer"
  },
  {
    image: "carmel-completed-repair-42.webp",
    title: "Refrigerator ice compartment service and inspection",
    alt: "Refrigerator ice compartment service and inspection for a Carmel appliance repair customer"
  },
  {
    image: "carmel-completed-repair-48.webp",
    title: "Refrigerator drain line cleaning for a water leak",
    alt: "Refrigerator drain line cleaning for a Carmel appliance repair customer with a water leak"
  },
  {
    image: "carmel-completed-repair-50.webp",
    title: "Frozen refrigerator evaporator coil defrost service",
    alt: "Frozen refrigerator evaporator coil defrost service for a Carmel appliance repair customer"
  }
];

const cities = {
  carmel: {
    name: "Carmel",
    county: "Hamilton County",
    zipCodes: ["46032", "46033"],
    hero: "carmel-service.webp",
    areas: ["Arts & Design District", "Midtown", "Carmel City Center", "Old Meridian", "Village of WestClay", "Home Place"],
    mainIntro: "Local appliance service for Carmel households, from central neighborhoods to homes east and west of US-31. Appointments are scheduled by route, appliance type and technician availability.",
    localLead: "Carmel service calls cover both 46032 and 46033. Model and serial information collected during booking helps us prepare for the appliance before the visit.",
    housingNote: "Carmel homes include established kitchens, newer subdivisions and built-in appliance layouts. Access, installation style and ventilation are checked along with the failed component.",
    routeNote: "We confirm an arrival window based on the active Carmel route. Same-day or next-day service may be available, but timing depends on schedule capacity and parts.",
    sectionOrder: ["symptoms", "diagnosis", "local", "process"]
  },
  fishers: {
    name: "Fishers",
    county: "Hamilton County",
    zipCodes: ["46037", "46038", "46040"],
    hero: "fishers.webp",
    areas: ["Downtown Fishers", "Geist", "Saxony", "Sunblest", "Delaware Township", "Fall Creek"],
    mainIntro: "Appliance repair routed throughout Fishers for kitchen and laundry equipment. We serve established neighborhoods, newer developments and homes around the Geist area.",
    localLead: "Fishers appointments span 46037, 46038 and nearby 46040 addresses. Booking details are used to match the call with the correct diagnostic equipment and route.",
    housingNote: "Fishers properties range from compact laundry installations to large kitchens with multiple built-in appliances. The installation and surrounding connections are part of the diagnosis.",
    routeNote: "Route planning across Fishers is based on technician location, job duration and appliance category. We provide a realistic appointment window rather than promising an unsupported arrival time.",
    sectionOrder: ["local", "symptoms", "process", "diagnosis"]
  },
  westfield: {
    name: "Westfield",
    county: "Hamilton County",
    zipCodes: ["46074"],
    hero: "westfield.webp",
    areas: ["Downtown Westfield", "Grand Junction", "Centennial", "Countryside", "Harmony", "Chatham Hills"],
    mainIntro: "Local appliance repair for Westfield homes, with service focused on accurate diagnosis, clear estimates and repairs that are tested before the visit is closed.",
    localLead: "Westfield appointments are routed throughout 46074. Providing the model number and a short description of the symptom helps us prepare before arrival.",
    housingNote: "Westfield includes both established homes and newer construction. We check the appliance, its installation and the utility connections that can influence performance.",
    routeNote: "Same-day or next-day availability changes with the active Westfield route and required parts. The booking window is confirmed before the technician is dispatched.",
    sectionOrder: ["symptoms", "local", "diagnosis", "process"]
  },
  noblesville: {
    name: "Noblesville",
    county: "Hamilton County",
    zipCodes: ["46060", "46062"],
    hero: "noblesville.webp",
    areas: ["Downtown Noblesville", "Morse Reservoir area", "Hazel Dell", "Deer Path", "Sagamore", "Stony Creek"],
    mainIntro: "Appliance repair for Noblesville kitchens and laundry rooms, including homes near downtown, Morse Reservoir and the growing east and west sides of the city.",
    localLead: "Noblesville service is scheduled across 46060 and 46062. We organize calls by geography and appliance type so the appointment window reflects the actual route.",
    housingNote: "Noblesville service calls include freestanding appliances, stacked laundry, garage freezers and built-in kitchen equipment. Each installation is evaluated on its own condition.",
    routeNote: "We use the reported symptom, model information and technician position to plan the Noblesville visit. Part availability is confirmed before a return repair is scheduled.",
    sectionOrder: ["diagnosis", "symptoms", "local", "process"]
  },
  mccordsville: {
    name: "McCordsville",
    county: "Hancock County",
    zipCodes: ["46055"],
    hero: "mccordsville.webp",
    areas: ["Central McCordsville", "46055 neighborhoods", "Geist Reservoir area", "Northwest Hancock County", "Nearby Vernon Township"],
    mainIntro: "Appliance repair for McCordsville and nearby 46055 households, including neighborhoods south of Geist Reservoir and surrounding northwest Hancock County communities.",
    localLead: "McCordsville calls are routed through 46055 and nearby parts of northwest Hancock County. Accurate address and model details help prevent avoidable scheduling delays.",
    housingNote: "Many McCordsville appointments involve newer kitchens and laundry rooms, but age alone does not identify the failure. Electrical, water, drain and ventilation conditions are checked as appropriate.",
    routeNote: "Because McCordsville sits between several service corridors, availability depends on the active route. We confirm the window and communicate before arrival.",
    sectionOrder: ["process", "local", "symptoms", "diagnosis"]
  },
  zionsville: {
    name: "Zionsville",
    county: "Boone County",
    zipCodes: ["46077"],
    hero: "zionsville-image.webp",
    areas: ["Village of Zionsville", "Stonegate", "Austin Oaks", "Royal Run", "Holliday Farms", "Eagle Township"],
    mainIntro: "Local appliance repair for Zionsville and nearby 46077 homes, with attention to built-in installations, premium kitchen equipment and everyday laundry appliances.",
    localLead: "Zionsville appointments are planned across 46077 and nearby Boone County neighborhoods. Model information lets us research the appliance before the technician arrives.",
    housingNote: "Zionsville homes may include integrated refrigeration, pro-style cooking equipment or standard freestanding appliances. The diagnosis accounts for installation, airflow and utility connections.",
    routeNote: "We schedule Zionsville calls according to route capacity and expected diagnostic time. Same-day service can be available, but it is never promised without checking the live schedule.",
    sectionOrder: ["local", "process", "diagnosis", "symptoms"]
  }
};

const services = {
  refrigerator: {
    label: "Refrigerator Repair",
    singular: "refrigerator",
    image: "refrigerator-repair.webp",
    titleSuffix: "Cooling & Leak Service",
    metaIssues: "cooling, leaks, frost and ice maker problems",
    summary: "Diagnosis and repair for refrigerators that are warm, leaking, noisy, frosting over or having ice maker and dispenser problems.",
    issues: [
      ["Not cooling evenly", "Temperature problems may involve airflow, evaporator frost, sensors, fans, controls or the sealed system."],
      ["Water under the unit", "Drain restrictions, tubing, valves, filters and defrost water paths are checked before parts are recommended."],
      ["Ice maker not producing", "The water supply, inlet valve, temperature, fill path and ice maker controls must work together."],
      ["Heavy frost buildup", "A defrost heater, sensor, control or door-seal problem can allow ice to block the evaporator."],
      ["Fan or vibration noise", "Condenser and evaporator fans, ice contact and loose panels can create different types of noise."],
      ["Food freezing or warming", "Air dampers, thermistors, controls and blocked vents can shift temperatures between compartments."]
    ],
    components: ["evaporator and condenser fans", "defrost heaters and sensors", "water inlet valves and tubing", "ice makers and dispensers", "thermistors and controls", "door switches and gaskets"],
    safety: "Move food to safe cold storage if temperatures rise. Water near an electrical appliance should be addressed promptly.",
    faq: [
      ["Why is my refrigerator running but not cooling?", "Running sound does not confirm proper airflow or heat transfer. Fans, frost, sensors, compressor operation and the sealed system may need testing."],
      ["Can a refrigerator leak be repaired?", "Many leaks come from a blocked defrost drain, valve, filter connection or water line. The source should be identified before replacing parts."],
      ["Do you repair ice makers?", "Yes. Ice maker service can include diagnosis of the ice maker, inlet valve, fill tube, temperature and dispenser controls."],
      ["Should I unplug a warm refrigerator?", "If there is burning odor, sparking or water at electrical components, disconnect power if it is safe. Otherwise keep the doors closed and arrange diagnosis."]
    ]
  },
  washer: {
    label: "Washer Repair",
    singular: "washing machine",
    image: "washer-repair.webp",
    titleSuffix: "Drain, Spin & Leak Service",
    metaIssues: "drain, spin, fill, vibration and leak problems",
    summary: "Service for washing machines that will not drain, spin, fill or start, plus leaks, vibration, door-lock faults and error codes.",
    issues: [
      ["Water stays in the drum", "The drain filter, hose, pump and control commands are checked to separate a blockage from a failed component."],
      ["Washer will not spin", "Door locks, lid switches, belts, motors, suspension and load-balance conditions can interrupt the spin cycle."],
      ["Machine shakes or walks", "Leveling, suspension rods, shocks, bearings and installation clearances affect vibration."],
      ["No water or slow fill", "Supply pressure, screens, inlet valves, hoses and pressure sensing are part of the fill diagnosis."],
      ["Door remains locked", "A lock assembly, drain problem or control fault can keep a front-load washer from releasing the door."],
      ["Water leaks during a cycle", "Hoses, pumps, door boots, dispensers and tub connections are inspected while the leak path is traced."]
    ],
    components: ["drain pumps and filters", "door locks and lid switches", "water inlet valves", "suspension rods and shocks", "belts, motors and sensors", "hoses, boots and dispensers"],
    safety: "Stop using a washer that leaks onto the floor or produces a burning smell. Shut off the water supply if an active leak continues.",
    faq: [
      ["Why will my washer not drain?", "A blocked filter or hose is common, but the pump, wiring, pressure sensor or control may also prevent draining."],
      ["Can an unbalanced washer be repaired?", "Yes. Leveling and load issues are checked first, followed by suspension, shocks, bearings and structural components."],
      ["Do you service front-load and top-load washers?", "Yes. Diagnosis is based on the model, design and reported symptom rather than the loading style alone."],
      ["What information helps before the appointment?", "The model number, error code, cycle stage and whether water remains in the tub help prepare for the visit."]
    ]
  },
  dryer: {
    label: "Dryer Repair",
    singular: "dryer",
    image: "dryer-repair.webp",
    titleSuffix: "No Heat & Long Dry Times",
    metaIssues: "no heat, long dry times, noise and overheating",
    summary: "Repair for gas and electric dryers with no heat, long drying times, drum problems, overheating, unusual noise or startup failures.",
    issues: [
      ["Clothes stay damp", "Airflow, lint restrictions, heating output and moisture sensing all affect cycle time."],
      ["Dryer will not heat", "Electric elements, thermal devices, gas ignition parts, controls and power supply require different tests."],
      ["Drum does not turn", "Belts, idler pulleys, rollers, motors and door switches can stop drum movement."],
      ["Squealing or rumbling", "Worn rollers, idlers, bearings or foreign objects create distinct sounds that help locate the source."],
      ["Unit overheats", "Restricted airflow, cycling controls, sensors or a grounded heating element can raise temperatures."],
      ["Dryer will not start", "Door switches, thermal fuses, controls, motors and incoming power are checked in sequence."]
    ],
    components: ["heating elements and igniters", "thermal fuses and thermostats", "belts and idler pulleys", "drum rollers and bearings", "motors and blower wheels", "moisture sensors and controls"],
    safety: "Stop the dryer if you smell burning, see scorching or notice excessive cabinet heat. A restricted vent can create a fire risk and must be corrected.",
    faq: [
      ["Why does my dryer take two cycles?", "Restricted airflow is common, but weak heat, sensor problems, an overloaded drum or a long vent route can also extend drying time."],
      ["Do you repair gas and electric dryers?", "Yes. Gas ignition systems and electric heating circuits use different components and test procedures."],
      ["Can a noisy dryer damage other parts?", "A worn roller, idler or blower can add resistance and place extra load on the belt and motor."],
      ["Is vent cleaning part of dryer repair?", "The accessible appliance airflow path is checked. Full building vent cleaning may require a dedicated vent-cleaning service depending on the installation."]
    ]
  },
  dishwasher: {
    label: "Dishwasher Repair",
    singular: "dishwasher",
    image: "dishwasher-repair.webp",
    titleSuffix: "Drain & Leak Service",
    metaIssues: "drain, leak, wash and circulation problems",
    summary: "Diagnosis for dishwashers that leak, will not drain, leave dishes dirty, make unusual noise or stop with an error code.",
    issues: [
      ["Water remains after the cycle", "Filters, drain hoses, check valves, pumps and disposal connections can all affect drainage."],
      ["Dishes are still dirty", "Circulation pressure, spray arms, filters, water temperature and detergent delivery are evaluated together."],
      ["Leak at the door or base", "Door seals, hinges, fill systems, pumps, hoses and excess suds produce different leak patterns."],
      ["No water enters", "The shutoff, inlet valve, float, door latch and control signal are checked before replacing the valve."],
      ["Grinding or humming", "Foreign objects, circulation pumps, drain pumps and diverter systems can create noise during different cycle stages."],
      ["Cycle stops or shows an error", "Stored codes, sensors, heating, door detection and control communication guide the diagnosis."]
    ],
    components: ["circulation and drain pumps", "diverters and spray arms", "water inlet valves", "heaters and temperature sensors", "door latches and seals", "controls, floats and wiring"],
    safety: "Turn off power and the water supply if a dishwasher is actively leaking. Avoid repeated cycles that can damage flooring or cabinetry.",
    faq: [
      ["Why does my dishwasher leave water in the bottom?", "A small amount near the sump can be normal, but standing water may indicate a blocked path, pump problem or installation issue."],
      ["Can a circulation pump be replaced?", "Yes, when testing confirms the pump is not moving water correctly and the surrounding hoses and controls are serviceable."],
      ["Why are dishes dirty after a full cycle?", "Blocked spray arms, a restricted filter, low water temperature, weak circulation or loading can reduce cleaning."],
      ["Do you repair built-in dishwashers?", "Yes. Access, mounting, flooring and cabinet protection are considered before the appliance is moved."]
    ]
  },
  stove: {
    label: "Stove & Oven Repair",
    singular: "stove or oven",
    image: "stove-repair.webp",
    titleSuffix: "Heat & Ignition Service",
    metaIssues: "oven heat, burner, ignition and temperature problems",
    summary: "Repair for gas and electric ranges and ovens with ignition trouble, weak burners, temperature errors, control faults or heating failures.",
    issues: [
      ["Oven will not heat", "Bake elements, igniters, gas valves, sensors, controls and power supply are tested according to the fuel type."],
      ["Temperature is inaccurate", "Sensor readings, calibration, airflow and heating cycles determine whether the fault is control or component related."],
      ["Gas burner will not ignite", "Caps, ports, electrodes, switches, wiring and gas delivery all influence ignition."],
      ["Electric element stays cold", "Elements, receptacles, infinite switches, wiring and incoming voltage are checked under safe conditions."],
      ["Control displays an error", "Codes can point toward sensors, latches, controls or communication, but testing confirms the failed part."],
      ["Door will not close correctly", "Hinges, springs, latches and door alignment affect both safety and temperature performance."]
    ],
    components: ["bake and broil elements", "igniters and gas valves", "surface elements and switches", "temperature sensors", "door hinges and latches", "electronic controls and wiring"],
    safety: "Leave the appliance off if you smell unburned gas. Ventilate the area, avoid flames or switches and contact the gas utility or emergency service when appropriate.",
    faq: [
      ["Why does my gas oven click but not light?", "The igniter may spark without proper gas ignition. Burner condition, electrode position, gas flow and controls need inspection."],
      ["Can an oven temperature be calibrated?", "Some temperature differences can be calibrated, but a failing sensor, element or control should be repaired first."],
      ["Do you repair gas and electric ranges?", "Yes. The diagnostic procedure is matched to the appliance fuel type and model."],
      ["Should I keep using one working burner?", "Stop use if there is arcing, gas odor, overheating or damaged wiring. A single failed burner can sometimes be isolated, but safety comes first."]
    ]
  },
  microwave: {
    label: "Microwave Repair",
    singular: "microwave",
    image: "microwave-repair.webp",
    titleSuffix: "Heating & Control Service",
    metaIssues: "heating, door, turntable and control problems",
    summary: "Diagnosis for built-in and over-the-range microwaves that will not heat, start, turn, vent or respond to the controls.",
    issues: [
      ["Runs but does not heat", "High-voltage components, controls and power delivery require trained testing because stored voltage can be dangerous."],
      ["Door will not latch", "Hooks, switches, mounts and alignment must operate in the correct sequence for safe startup."],
      ["Turntable does not move", "The motor, coupler, tray support and control output are checked after confirming the tray is seated."],
      ["Display or keypad is unresponsive", "Power supply, membrane controls, user-interface boards and main controls can cause similar symptoms."],
      ["Vent fan or light fails", "Motors, bulbs, sockets, relays and control outputs are evaluated on over-the-range models."],
      ["Sparking inside the cavity", "Metal contamination, damaged waveguide covers, racks or cavity damage must be identified before reuse."]
    ],
    components: ["door switches and latches", "turntable motors and couplers", "control and display assemblies", "vent fans and lights", "fuses and power circuits", "model-specific heating components"],
    safety: "Microwaves contain high-voltage components that can retain a dangerous charge after unplugging. Internal repair is not a do-it-yourself task.",
    faq: [
      ["Is a microwave worth repairing?", "Built-in and over-the-range units are often practical to repair when the cabinet, cavity and installation are in good condition."],
      ["Why does the microwave run without heating?", "Several high-voltage or control faults can cause this symptom. Safe electrical testing is required."],
      ["Can a broken door switch stop the microwave?", "Yes. Multiple interlock switches monitor the door, and a failed or misaligned switch can prevent operation."],
      ["Do you repair countertop microwaves?", "Service availability depends on model, parts and repair economics. Built-in and over-the-range units are the primary focus."]
    ]
  },
  cooktop: {
    label: "Cooktop Repair",
    singular: "cooktop",
    image: "cooktop-repair.webp",
    titleSuffix: "Burner & Ignition Service",
    metaIssues: "burner, ignition, element and control problems",
    summary: "Repair for gas, electric and induction cooktops with ignition faults, dead elements, uneven heat, error codes or damaged controls.",
    issues: [
      ["Gas burner keeps clicking", "Moisture, dirty ports, electrode position, switches and spark modules can all cause repeated ignition."],
      ["Burner will not light", "Gas flow, cap alignment, ports, igniters and controls are inspected before a component is replaced."],
      ["Electric element stays cold", "Elements, receptacles, regulators, switches and power connections are tested for continuity and load."],
      ["Heat cannot be adjusted", "A surface switch, valve or electronic control may fail to regulate output correctly."],
      ["Induction zone shows an error", "Cookware detection, sensors, cooling, wiring and power modules can produce model-specific codes."],
      ["Glass surface or trim is damaged", "A cracked cooking surface is a safety issue; model and part availability determine the repair path."]
    ],
    components: ["spark electrodes and modules", "burner caps and valves", "electric surface elements", "infinite switches and controls", "induction modules and sensors", "wiring, terminals and cooling fans"],
    safety: "Do not use a cooktop with a cracked glass surface, exposed wiring, uncontrolled flame or persistent gas odor.",
    faq: [
      ["Why does my cooktop keep clicking?", "Moisture or debris is common, but a failed ignition switch, electrode or spark module can also keep the system active."],
      ["Can one failed burner be repaired?", "Often yes. The burner, switch, valve, element or wiring can be isolated and tested separately."],
      ["Do you service induction cooktops?", "Yes, subject to model and parts support. Induction diagnosis includes cookware detection, sensors, cooling and power electronics."],
      ["Is cracked cooktop glass safe to use?", "No. A crack can expose electrical components or worsen with heat. Stop using the affected appliance and check replacement availability."]
    ]
  },
  freezer: {
    label: "Freezer Repair",
    singular: "freezer",
    image: "freezer-repair.webp",
    titleSuffix: "Cooling & Frost Service",
    metaIssues: "cooling, frost, fan, drain and leak problems",
    summary: "Service for upright, chest and refrigerator freezers with warming, heavy frost, fan noise, leaks or door-seal problems.",
    issues: [
      ["Freezer is not cold enough", "Airflow, fans, frost, sensors, controls and sealed-system performance are evaluated."],
      ["Ice covers the back panel", "Defrost heaters, sensors, controls, drains and door sealing can allow repeated frost accumulation."],
      ["Water appears on the floor", "Defrost drains, drain pans, tubing and melting frost are traced to the source."],
      ["Fan is noisy or stopped", "Ice contact, worn bearings, wiring and control output can interrupt evaporator airflow."],
      ["Compressor runs constantly", "Door sealing, ambient conditions, airflow and refrigeration performance affect run time."],
      ["Door will not seal", "Gaskets, hinges, cabinet alignment and ice buildup are checked before a seal is recommended."]
    ],
    components: ["evaporator and condenser fans", "defrost heaters and sensors", "thermostats and thermistors", "drain paths and pans", "door gaskets and hinges", "controls and starting components"],
    safety: "Protect frozen food if temperature rises. Disconnect power if water reaches electrical components or the appliance emits a burning odor.",
    faq: [
      ["Why is frost covering the freezer wall?", "A defrost failure, blocked airflow or door-seal problem can let ice build over the evaporator."],
      ["Can a freezer fan be replaced?", "Yes. The motor, blade, wiring and surrounding ice condition are checked to confirm the cause."],
      ["Why is water leaking from my freezer?", "A blocked defrost drain or melting frost is common, but the exact path should be inspected."],
      ["Do you repair chest and upright freezers?", "Yes, depending on model and parts support. Installation space and ambient temperature are also considered."]
    ]
  }
};

const brandCategoryOverrides = {
  bertazzoni: ["stove", "cooktop", "refrigerator", "dishwasher"],
  dacor: ["stove", "cooktop", "refrigerator", "dishwasher", "microwave"],
  "fisher-paykel": ["dishwasher", "refrigerator", "washer", "dryer", "stove", "cooktop"],
  gaggenau: ["stove", "cooktop", "refrigerator", "dishwasher"],
  jenn: ["stove", "cooktop", "refrigerator", "dishwasher", "microwave"],
  jennair: ["stove", "cooktop", "refrigerator", "dishwasher", "microwave"],
  "jenn-air": ["stove", "cooktop", "refrigerator", "dishwasher", "microwave"],
  liebherr: ["refrigerator", "freezer"],
  sharp: ["microwave", "cooktop"],
  "speed-queen": ["washer", "dryer"],
  "sub-zero": ["refrigerator", "freezer"],
  thermador: ["stove", "cooktop", "refrigerator", "dishwasher", "microwave"],
  viking: ["stove", "cooktop", "refrigerator", "dishwasher"],
  wolf: ["stove", "cooktop", "microwave"]
};

const brandNotes = {
  amana: "Amana models often use straightforward layouts, but the model number still determines the correct pump, control, valve, heating or drive component. We verify the symptom before treating a common platform part as the cause.",
  bertazzoni: "Bertazzoni service frequently centers on pro-style cooking equipment. Burner ignition, oven temperature, control response, ventilation clearances and access to built-in components are evaluated together.",
  bosch: "Bosch diagnosis commonly involves dishwashers, compact laundry and built-in kitchen equipment. Quiet operation can make pump, drain and circulation changes subtle, so cycle-stage testing and stored faults are useful.",
  dacor: "Dacor appliances combine premium finishes with model-specific cooking, control and refrigeration systems. Panel protection, installation access and accurate part identification are important before disassembly.",
  electrolux: "Electrolux service often includes front-load laundry, refrigeration and cooking products. Drain behavior, airflow, temperature sensing and recorded error information help narrow the repair path.",
  "fisher-paykel": "Fisher & Paykel products can include DishDrawer systems, column refrigeration and distinctive laundry designs. Each compartment or module is tested separately when the appliance architecture allows it.",
  frigidaire: "Frigidaire households may have refrigeration, freezer, cooking, dishwasher and laundry products from several model generations. Defrost, water, heating and control systems are checked against the exact product number.",
  gaggenau: "Gaggenau equipment is commonly integrated into cabinetry and premium kitchen layouts. Service preparation includes access, ventilation, adjacent panels and the model-specific sequence used by the appliance.",
  ge: "GE appliance families cover a wide range of refrigeration, laundry, dishwashing and cooking designs. The complete model number is essential because visually similar units can use different controls and components.",
  haier: "Haier appliances often use compact or space-conscious installations. Clearances, airflow, drain routing and access can influence both the symptom and the practical repair procedure.",
  hisense: "Hisense service can involve modern refrigeration, freezer and laundry controls. We separate sensor, fan, water and user-interface symptoms from installation or power conditions.",
  "jenn-air": "JennAir products frequently include built-in refrigeration and premium cooking equipment. Diagnosis accounts for panel access, ignition or heating performance, temperature control and connected modules.",
  kenmore: "Kenmore appliances were produced by different manufacturers across model families. The model prefix and full serial information are especially important for identifying the underlying platform and compatible parts.",
  kitchenaid: "KitchenAid service commonly involves dishwashers, refrigeration and cooking appliances. Circulation, water delivery, ice production, heating and control behavior are tested by cycle or operating mode.",
  lg: "LG appliances often combine electronic controls with model-specific sensors, fans, valves and drive systems. Error information is useful, but electrical and mechanical testing confirms whether the code identifies the cause or only the symptom.",
  liebherr: "Liebherr service is focused on refrigeration, freezer and preservation equipment. Compartment temperature, airflow, defrost behavior, door sealing and installation ventilation receive particular attention.",
  maytag: "Maytag repair frequently involves washers and dryers, along with kitchen appliances. Pumps, suspension, drive parts, airflow and heating circuits are inspected according to the model and the stage where operation stops.",
  midea: "Midea produces compact and full-size household appliances across several categories. Because model support and part families vary, we confirm identification and availability before recommending a component.",
  miele: "Miele appliances use detailed operating sequences across dishwashing, laundry and built-in kitchen products. Access planning, stored faults and model-specific test behavior help avoid unnecessary part replacement.",
  samsung: "Samsung service commonly involves refrigeration, laundry and connected kitchen appliances. Fans, sensors, valves, drain systems and control communication can create overlapping symptoms that require staged testing.",
  sharp: "Sharp repair is often associated with built-in, over-the-range and drawer microwave products. Door interlocks, control response, installation access and high-voltage safety shape the diagnostic process.",
  smeg: "SMEG appliances combine distinctive exterior design with cooking and refrigeration systems that vary by model. Finish protection and exact part identification are considered before panels or controls are removed.",
  "speed-queen": "Speed Queen service is centered on washers and dryers. Mechanical drive, water flow, drain, heating and airflow checks are matched to the specific commercial-style or residential control platform.",
  "sub-zero": "Sub-Zero service focuses on built-in refrigeration, freezer and wine-storage systems. Airflow, compartment temperatures, door sealing, defrost and installation ventilation are reviewed as a complete cooling system.",
  thermador: "Thermador products often include pro-style cooking, built-in refrigeration and dishwashing equipment. Ignition, heat, controls, water circulation and cabinet access require model-specific preparation.",
  viking: "Viking appliances frequently use professional-style ranges, ovens, cooktops and refrigeration. Burner combustion, ignition, temperature regulation, airflow and heavy-panel access are evaluated carefully.",
  whirlpool: "Whirlpool product lines span most kitchen and laundry categories. Although many components are widely supported, the complete model number and measured failure determine the correct revision and repair.",
  wolf: "Wolf service is concentrated on premium cooking appliances. Ignition, burner flame, electric heating, temperature sensing, door alignment and ventilation are central to a safe diagnosis."
};

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function write(relativePath, content) {
  const destination = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const normalized = content
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(
      /js\/script\.js\?v=[^"']+/g,
      "js/script.js?v=20260728-location-navigation"
    )
    .replace(
      /css\/style\.css\?v=[^"']+/g,
      "css/style.css?v=20260728-location-navigation"
    );
  fs.writeFileSync(destination, normalized, "utf8");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function decodeHtmlEntities(value) {
  let decoded = String(value);
  let previous;
  do {
    previous = decoded;
    decoded = decoded
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">");
  } while (decoded !== previous);
  return decoded;
}

function rotate(items, amount) {
  const offset = amount % items.length;
  return items.slice(offset).concat(items.slice(0, offset));
}

function schemaString(value) {
  return JSON.stringify(value, null, 2).replaceAll("<", "\\u003c");
}

function upsertHeadTag(html, regex, tag) {
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }
  return html.replace("</head>", `${tag}\n</head>`);
}

function updateHead(html, { title, description, canonical, image, schema, nested = true }) {
  const absoluteImage = image.startsWith("http") ? image : `https://alex-repair.com/${image.replace(/^\/+/, "")}`;
  html = upsertHeadTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = upsertHeadTag(html, /<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(description)}">`);
  html = upsertHeadTag(html, /<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}">`);
  html = upsertHeadTag(html, /<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtml(title)}">`);
  html = upsertHeadTag(html, /<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtml(description)}">`);
  html = upsertHeadTag(html, /<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${absoluteImage}">`);
  html = upsertHeadTag(html, /<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonical}">`);
  html = upsertHeadTag(html, /<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(title)}">`);
  html = upsertHeadTag(html, /<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(description)}">`);
  html = upsertHeadTag(html, /<meta\s+name=["']twitter:image["'][^>]*>/i, `<meta name="twitter:image" content="${absoluteImage}">`);
  html = upsertHeadTag(html, /<meta\s+name=["']twitter:url["'][^>]*>/i, `<meta name="twitter:url" content="${canonical}">`);
  html = html.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "");
  const cssHref = nested ? "../css/local-seo.css?v=20260728-unified-site" : "css/local-seo.css?v=20260728-unified-site";
  if (!html.includes("local-seo.css")) {
    html = html.replace("</head>", `\t<link rel="stylesheet" href="${cssHref}">\n</head>`);
  } else {
    html = html.replace(/(?:\.\.\/|\/)?css\/local-seo\.css\?v=[^"']+/i, cssHref);
  }
  html = html.replace("</head>", () => `<script type="application/ld+json">\n${schemaString(schema)}\n</script>\n</head>`);
  return html;
}

function ensureLocalSeoCss(html, nested = false) {
  const cssHref = nested ? "../css/local-seo.css?v=20260728-unified-site" : "css/local-seo.css?v=20260728-unified-site";
  if (html.includes("local-seo.css")) {
    return html.replace(/(?:\.\.\/|\/)?css\/local-seo\.css\?v=[^"']+/i, cssHref);
  }
  return html.replace("</head>", `\t<link rel="stylesheet" href="${cssHref}">\n</head>`);
}

function localBusinessSchema(city) {
  return {
    "@type": "LocalBusiness",
    "@id": "https://alex-repair.com/#business",
    name: "Alex Appliance Repair",
    legalName: "Aksenov LLC",
    url: "https://alex-repair.com/",
    image: "https://alex-repair.com/images/logo.webp",
    telephone: PHONE_LINK,
    email: "alexeasyrepair@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "6463 Bayside S Dr",
      addressLocality: "Indianapolis",
      addressRegion: "IN",
      postalCode: "46250",
      addressCountry: "US"
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: "IN",
      addressCountry: "US"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "18:00"
      }
    ]
  };
}

function serviceSchema(citySlug, serviceSlug, faqs) {
  const city = cities[citySlug];
  const service = services[serviceSlug];
  const url = `https://alex-repair.com/${citySlug}/${serviceSlug}-repair-services.html`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessSchema(city),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${service.label} in ${city.name}, Indiana`,
        serviceType: service.label,
        description: service.summary,
        url,
        provider: { "@id": "https://alex-repair.com/#business" },
        areaServed: [
          { "@type": "City", name: city.name, addressRegion: "IN", addressCountry: "US" },
          { "@type": "AdministrativeArea", name: city.county, addressRegion: "IN", addressCountry: "US" }
        ],
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          description: "The service call is $89 and is waived when the quoted repair is completed."
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alex-repair.com/" },
          { "@type": "ListItem", position: 2, name: `Appliance Repair in ${city.name}, IN`, item: `https://alex-repair.com/${citySlug}.html` },
          { "@type": "ListItem", position: 3, name: `${service.label} in ${city.name}, IN`, item: url }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };
}

function issueFeatures(service, cityIndex) {
  return rotate(service.issues, cityIndex)
    .map(([title, description]) => `<div class="local-feature"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div>`)
    .join("\n");
}

function relatedServiceLinks(citySlug, activeService) {
  return SERVICE_SLUGS
    .filter((slug) => slug !== activeService)
    .map((slug) => `<li><a href="https://alex-repair.com/${citySlug}/${slug}-repair-services.html">${escapeHtml(services[slug].label)}</a></li>`)
    .join("\n");
}

function renderServiceSection(section, citySlug, serviceSlug, cityIndex) {
  const city = cities[citySlug];
  const service = services[serviceSlug];
  if (section === "symptoms") {
    return `
<section class="local-section">
  <div class="local-shell">
    <header class="local-section-header">
      <p class="local-eyebrow">Problems we diagnose</p>
      <h2>${escapeHtml(service.label)} symptoms in ${escapeHtml(city.name)}</h2>
      <p>The symptom tells us where to begin, but testing determines which component or installation condition is responsible.</p>
    </header>
    <div class="local-grid local-grid--three">
      ${issueFeatures(service, cityIndex)}
    </div>
  </div>
</section>`;
  }
  if (section === "diagnosis") {
    return `
<section class="local-section local-section--soft">
  <div class="local-shell local-coverage">
    <div class="local-copy">
      <p class="local-eyebrow">Model-specific diagnosis</p>
      <h2>How we approach ${escapeHtml(service.singular)} repair</h2>
      <p>${escapeHtml(city.housingNote)}</p>
      <p>Diagnosis can include operating checks, stored error codes, electrical measurements, temperature or airflow readings and visual inspection. We explain the result and provide an estimate before proceeding with the repair.</p>
      <p><strong>Safety note:</strong> ${escapeHtml(service.safety)}</p>
    </div>
    <aside class="local-coverage-aside">
      <h3>Components commonly evaluated</h3>
      <ul>
        ${service.components.map((component) => `<li>${escapeHtml(component)}</li>`).join("\n")}
      </ul>
    </aside>
  </div>
</section>`;
  }
  if (section === "local") {
    return `
<section class="local-section">
  <div class="local-shell local-coverage">
    <div class="local-copy">
      <p class="local-eyebrow">${escapeHtml(city.county)} service area</p>
      <h2>Local ${escapeHtml(service.label.toLowerCase())} coverage</h2>
      <p>${escapeHtml(city.localLead)}</p>
      <p>${escapeHtml(city.routeNote)}</p>
      <p>ZIP codes served on this city route: <strong>${city.zipCodes.join(", ")}</strong>. Service is provided at customer locations; these city references do not represent separate office addresses.</p>
    </div>
    <aside class="local-coverage-aside">
      <h3>Areas commonly scheduled</h3>
      <ul>
        ${city.areas.map((area) => `<li>${escapeHtml(area)}</li>`).join("\n")}
      </ul>
    </aside>
  </div>
</section>`;
  }
  return `
<section class="local-section local-section--blue">
  <div class="local-shell">
    <header class="local-section-header">
      <p class="local-eyebrow">Clear repair process</p>
      <h2>What happens during a service visit</h2>
    </header>
    <ol class="local-process">
      <li><strong>Schedule</strong>Share the address, appliance type, brand, model and current symptom.</li>
      <li><strong>Diagnose</strong>The technician tests the appliance and identifies the most likely failure.</li>
      <li><strong>Approve</strong>You receive the repair recommendation and estimate before work continues.</li>
      <li><strong>Repair and test</strong>The completed work is tested under applicable operating conditions.</li>
    </ol>
  </div>
</section>`;
}

function renderServiceMain(citySlug, serviceSlug) {
  const city = cities[citySlug];
  const service = services[serviceSlug];
  const cityIndex = CITY_SLUGS.indexOf(citySlug);
  const introVariants = [
    `${service.summary} Service is scheduled across ${city.name} with clear estimates and model-specific diagnosis.`,
    `Need help with a ${service.singular} in ${city.name}? ${service.summary} Appointments are organized by route and availability.`,
    `${service.label} for ${city.name} homes focuses on the cause of the failure, not just the visible symptom. ${service.summary}`,
    `For ${city.name} households, ${service.summary.toLowerCase()} The technician documents the diagnosis before repair approval.`,
    `${service.summary} Our ${city.name} route covers ${city.zipCodes.join(" and ")} with scheduling based on live capacity.`,
    `Local ${service.label.toLowerCase()} in ${city.name} includes careful testing, an explained estimate and final operating checks. ${service.summary}`
  ];
  const sections = city.sectionOrder.map((section) => renderServiceSection(section, citySlug, serviceSlug, cityIndex)).join("\n");
  const faqs = service.faq.map(([question, answer], index) => [
    index === 0 ? `${question.replace(/\?$/, "")} in ${city.name}?` : question,
    answer
  ]);
  return `<main class="local-seo-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb">
  <div class="local-shell">
    <ol>
      <li><a href="https://alex-repair.com/">Home</a></li>
      <li><a href="https://alex-repair.com/${citySlug}.html">${escapeHtml(city.name)}</a></li>
      <li aria-current="page">${escapeHtml(service.label)}</li>
    </ol>
  </div>
</nav>

<section class="local-hero">
  <div class="local-hero-media">
    <img src="../images/${service.image}" alt="${escapeHtml(service.label)} in ${escapeHtml(city.name)}, Indiana" width="1200" height="800" fetchpriority="high">
  </div>
  <div class="local-shell local-hero-content">
    <p class="local-eyebrow">${escapeHtml(city.name)}, Indiana</p>
    <h1>${escapeHtml(service.label)} in ${escapeHtml(city.name)}, IN</h1>
    <p class="local-hero-lead">${escapeHtml(introVariants[cityIndex])}</p>
    <ul class="local-proof-list">
      <li>$89 service call</li>
      <li>Fee waived with completed repair</li>
      <li>12-month parts and labor warranty</li>
    </ul>
    <div class="local-actions">
      <a class="local-button" href="${BOOKING_URL}">Book service online</a>
      <a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a>
    </div>
  </div>
</section>

${sections}

<section class="local-section local-section--soft">
  <div class="local-shell">
    <header class="local-section-header">
      <p class="local-eyebrow">Related local services</p>
      <h2>Other appliance repair in ${escapeHtml(city.name)}</h2>
      <p>Use the dedicated page for the appliance that needs diagnosis. This keeps scheduling details and service information focused.</p>
    </header>
    <ul class="local-link-list">
      ${relatedServiceLinks(citySlug, serviceSlug)}
    </ul>
  </div>
</section>

<section class="local-section">
  <div class="local-shell">
    <header class="local-section-header">
      <p class="local-eyebrow">Frequently asked questions</p>
      <h2>${escapeHtml(service.label)} questions</h2>
    </header>
    <div class="local-faq-list">
      ${faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("\n")}
    </div>
  </div>
</section>

<section class="local-cta">
  <div class="local-shell local-cta-row">
    <div>
      <h2>Schedule ${escapeHtml(service.label.toLowerCase())} in ${escapeHtml(city.name)}</h2>
      <p>Have the model number and a short description of the problem ready when possible.</p>
    </div>
    <a class="local-button" href="${BOOKING_URL}">Book service online</a>
  </div>
</section>
</main>`;
}

function rebuildServicePages() {
  for (const [citySlug, city] of Object.entries(cities)) {
    for (const [serviceSlug, service] of Object.entries(services)) {
      const relativePath = `${citySlug}/${serviceSlug}-repair-services.html`;
      let html = read(relativePath);
      const title = `${service.label} ${city.name} IN | ${service.titleSuffix}`;
      const description = `Local ${service.label.toLowerCase()} in ${city.name}, IN for ${service.metaIssues}. $89 service call, waived with completed repair.`;
      const faqs = service.faq.map(([question, answer], index) => [
        index === 0 ? `${question.replace(/\?$/, "")} in ${city.name}?` : question,
        answer
      ]);
      html = updateHead(html, {
        title,
        description,
        canonical: `https://alex-repair.com/${citySlug}/${serviceSlug}-repair-services.html`,
        image: `images/${service.image}`,
        schema: serviceSchema(citySlug, serviceSlug, faqs),
        nested: true
      });
      html = html.replace(/<main[\s\S]*?<\/main>/i, renderServiceMain(citySlug, serviceSlug));
      write(relativePath, html);
    }
  }
}

function cityMainSchema(citySlug) {
  const city = cities[citySlug];
  const url = `https://alex-repair.com/${citySlug}.html`;
  const faqs = cityMainFaq(citySlug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...localBusinessSchema(city),
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Appliance Repair Services in ${city.name}`,
          itemListElement: SERVICE_SLUGS.map((serviceSlug) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${services[serviceSlug].label} in ${city.name}, IN`,
              url: `https://alex-repair.com/${citySlug}/${serviceSlug}-repair-services.html`
            }
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alex-repair.com/" },
          { "@type": "ListItem", position: 2, name: `Appliance Repair in ${city.name}, IN`, item: url }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };
}

function cityMainFaq(citySlug) {
  const city = cities[citySlug];
  return [
    [`Which appliances do you repair in ${city.name}?`, "We repair refrigerators, freezers, washers, dryers, dishwashers, stoves, ovens, cooktops and many built-in or over-the-range microwaves."],
    [`Which parts of ${city.name} do you serve?`, `Service is available across ${city.zipCodes.join(", ")} and local areas including ${city.areas.join(", ")}. The exact address is confirmed during booking.`],
    [`How much is the service call in ${city.name}?`, "The service call is $89 and is waived when the quoted repair is completed."],
    ["Is same-day service guaranteed?", "No. Same-day or next-day appointments may be available, but the confirmed window depends on the active route, job duration and parts."],
    ["What should I provide when booking?", "The appliance type, brand, model number, address and a short description of the symptom help us prepare for the visit."],
    ["Is repair work covered by a warranty?", "Completed repairs include a 12-month parts and labor warranty under the applicable service terms."]
  ];
}

function renderCarmelCompletedRepairs() {
  const cards = carmelCompletedRepairs.map((repair, index) => {
    const imageUrl = `images/carmel-completed-repairs/${repair.image}`;
    return `<figure class="carmel-repair-proof-card">
        <img loading="lazy" src="${imageUrl}" width="640" height="480" alt="${escapeHtml(repair.alt)}">
        <figcaption>${escapeHtml(repair.title)}</figcaption>
        <a href="${imageUrl}" class="carmel-repairs-lightbox carmel-repair-card-link" aria-label="View ${escapeHtml(repair.title.toLowerCase())} photo" onclick="return window.openCarmelGalleryFromCard ? window.openCarmelGalleryFromCard(event, ${index}) : true;"></a>
        <button class="carmel-repair-card-button" type="button" aria-label="View ${escapeHtml(repair.title.toLowerCase())} photo" onclick="return window.openCarmelGalleryFromCard(event, ${index});"></button>
      </figure>`;
  }).join("\n");
  return `
<section class="local-section local-section--soft carmel-completed-repairs" aria-labelledby="carmel-completed-repairs-title">
  <div class="local-shell">
    <header class="local-section-header">
      <p class="local-eyebrow">Actual appliance repair work</p>
      <h2 id="carmel-completed-repairs-title">Real Completed Repairs in Carmel</h2>
      <p>Original job photos from Carmel-area and Hamilton County service calls. The examples show diagnostics, component access, cleaning and completed work on refrigeration, dishwashing and cooking appliances.</p>
    </header>
    <div class="carmel-repairs-native-slider" aria-label="Selected completed appliance repairs in Carmel">
      <div class="carmel-repairs-track">
        ${cards}
      </div>
      <div class="carmel-repairs-controls" aria-label="Completed repair photo controls">
        <button class="carmel-repairs-prev" type="button" aria-label="Previous repair photo">&#8592;</button>
        <button class="carmel-repairs-next" type="button" aria-label="Next repair photo">&#8594;</button>
      </div>
    </div>
    <p class="carmel-repair-proof-note">These photographs document the equipment and components encountered during local service. Every repair recommendation is based on the appliance model, measured failure and condition found during diagnosis.</p>
  </div>
</section>`;
}

function renderCityMain(citySlug) {
  const city = cities[citySlug];
  const cityIndex = CITY_SLUGS.indexOf(citySlug);
  const serviceCards = rotate(SERVICE_SLUGS, cityIndex)
    .map((serviceSlug) => {
      const service = services[serviceSlug];
      const issue = service.issues[cityIndex % service.issues.length];
      return `<div class="local-feature"><h3><a href="https://alex-repair.com/${citySlug}/${serviceSlug}-repair-services.html">${escapeHtml(service.label)}</a></h3><p>${escapeHtml(issue[0])}, ${escapeHtml(issue[1].charAt(0).toLowerCase() + issue[1].slice(1))}</p></div>`;
    })
    .join("\n");
  const faq = cityMainFaq(citySlug);
  const localProof = citySlug === "carmel" ? renderCarmelCompletedRepairs() : "";
  return `<main class="local-seo-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb">
  <div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li><li aria-current="page">${escapeHtml(city.name)}</li></ol></div>
</nav>

<section class="local-hero">
  <div class="local-hero-media">
    <img src="images/${city.hero}" alt="Appliance repair service area in ${escapeHtml(city.name)}, Indiana" width="1536" height="768" fetchpriority="high">
  </div>
  <div class="local-shell local-hero-content">
    <p class="local-eyebrow">Aksenov LLC operates as Alex Appliance Repair</p>
    <h1>Appliance Repair in ${escapeHtml(city.name)}, IN</h1>
    <p class="local-hero-lead">${escapeHtml(city.mainIntro)}</p>
    <ul class="local-proof-list">
      <li>$89 service call</li>
      <li>Fee waived with completed repair</li>
      <li>12-month parts and labor warranty</li>
    </ul>
    <div class="local-actions">
      <a class="local-button" href="${BOOKING_URL}">Book service online</a>
      <a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a>
    </div>
  </div>
</section>

<section class="local-section">
  <div class="local-shell">
    <header class="local-section-header">
      <p class="local-eyebrow">Kitchen and laundry appliances</p>
      <h2>Repair services available in ${escapeHtml(city.name)}</h2>
      <p>Each appliance has a dedicated local page with symptoms, diagnostic information and booking details. Choose the equipment that needs service.</p>
    </header>
    <div class="local-grid local-grid--three">${serviceCards}</div>
  </div>
</section>

<section class="local-section local-section--soft">
  <div class="local-shell local-coverage">
    <div class="local-copy">
      <p class="local-eyebrow">${escapeHtml(city.county)}</p>
      <h2>Coverage designed around the ${escapeHtml(city.name)} route</h2>
      <p>${escapeHtml(city.localLead)}</p>
      <p>${escapeHtml(city.housingNote)}</p>
      <p>${escapeHtml(city.routeNote)}</p>
    </div>
    <aside class="local-coverage-aside">
      <h3>Service area references</h3>
      <ul>${city.areas.map((area) => `<li>${escapeHtml(area)}</li>`).join("\n")}</ul>
      <p>ZIP codes: <strong>${city.zipCodes.join(", ")}</strong></p>
    </aside>
  </div>
</section>

${localProof}

<section class="local-section local-section--blue">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">No guesswork</p><h2>A practical service process</h2></header>
    <ol class="local-process">
      <li><strong>Book</strong>Share the appliance, address, model and current symptom.</li>
      <li><strong>Inspect</strong>The technician checks the appliance and relevant installation conditions.</li>
      <li><strong>Review</strong>You receive an explained diagnosis and estimate before repair approval.</li>
      <li><strong>Verify</strong>Completed work is tested and documented under the applicable warranty terms.</li>
    </ol>
  </div>
</section>

<section class="local-section">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">Local service questions</p><h2>Before you schedule</h2></header>
    <div class="local-faq-list">${faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("\n")}</div>
  </div>
</section>

<section class="local-cta">
  <div class="local-shell local-cta-row">
    <div><h2>Book appliance repair in ${escapeHtml(city.name)}</h2><p>Online booking is available for refrigerator, laundry, dishwasher and cooking appliance service.</p></div>
    <a class="local-button" href="${BOOKING_URL}">Book service online</a>
  </div>
</section>
</main>`;
}

function rebuildMainCityPages() {
  for (const citySlug of CITY_SLUGS) {
    const city = cities[citySlug];
    const relativePath = `${citySlug}.html`;
    let html = read(relativePath);
    const title = `Appliance Repair ${city.name} IN | Local Service`;
    const description = `Local appliance repair in ${city.name}, IN for refrigerators, washers, dryers, dishwashers, ovens and more. $89 service call, waived with completed repair.`;
    html = updateHead(html, {
      title,
      description,
      canonical: `https://alex-repair.com/${citySlug}.html`,
      image: `images/${city.hero}`,
      schema: cityMainSchema(citySlug),
      nested: false
    });
    html = html.replace(/<main[\s\S]*?<\/main>/i, renderCityMain(citySlug));
    write(relativePath, html);
  }
}

function parseBrandCards() {
  const html = read("brands.html");
  const brands = [];
  const cardRegex = /<article class="brand-directory-card" id="([^"]+)">([\s\S]*?)<\/article>/g;
  for (const match of html.matchAll(cardRegex)) {
    const slug = match[1];
    const card = match[2];
    const nameMatch = card.match(/<span>([\s\S]*?)<\/span>/i);
    const descriptionMatch = card.match(/<p>([\s\S]*?)<\/p>/i);
    const logoMatch = card.match(/<img[^>]+src="([^"]+)"/i);
    if (!nameMatch || !descriptionMatch || !logoMatch) continue;
    brands.push({
      slug,
      name: nameMatch[1].replace(/<[^>]+>/g, "").replaceAll("&amp;", "&").trim(),
      description: descriptionMatch[1].replace(/<[^>]+>/g, "").replaceAll("&amp;", "&").trim(),
      logo: logoMatch[1]
    });
  }
  return brands;
}

function inferBrandServices(brand) {
  if (brandCategoryOverrides[brand.slug]) return brandCategoryOverrides[brand.slug];
  const text = brand.description.toLowerCase();
  const result = [];
  if (/refriger|cooling/.test(text)) result.push("refrigerator");
  if (/freezer/.test(text)) result.push("freezer");
  if (/washer|laundry/.test(text)) result.push("washer");
  if (/dryer|laundry/.test(text)) result.push("dryer");
  if (/dishwasher/.test(text)) result.push("dishwasher");
  if (/range|oven|cooking|kitchen/.test(text)) result.push("stove");
  if (/cooktop|cooking|range/.test(text)) result.push("cooktop");
  if (/microwave/.test(text)) result.push("microwave");
  return [...new Set(result)].slice(0, 8);
}

function brandSchema(brand, brandServices) {
  const url = `https://alex-repair.com/brands/${brand.slug}-appliance-repair.html`;
  const allAreas = Object.values(cities).map((city) => ({
    "@type": "City",
    name: city.name,
    addressRegion: "IN",
    addressCountry: "US"
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...localBusinessSchema(cities.fishers),
        areaServed: allAreas
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: brand.name,
        serviceType: brand.name,
        description: brand.description,
        url,
        provider: { "@id": "https://alex-repair.com/#business" },
        areaServed: allAreas,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${brand.name} service categories`,
          itemListElement: brandServices.map((serviceSlug) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: services[serviceSlug].label,
              url: `https://alex-repair.com/${serviceSlug}-repair.html`
            }
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alex-repair.com/" },
          { "@type": "ListItem", position: 2, name: "Appliance Brands", item: "https://alex-repair.com/brands.html" },
          { "@type": "ListItem", position: 3, name: brand.name, item: url }
        ]
      }
    ]
  };
}

function renderBrandMain(brand, brandServices) {
  const shortName = brand.name.replace(/ Appliance Repair$/i, "");
  const primaryServices = brandServices.length ? brandServices : ["refrigerator", "dishwasher", "stove"];
  const brandNote = brandNotes[brand.slug] || `${shortName} appliances require model-specific diagnosis and part verification before a repair is recommended.`;
  const issueCards = primaryServices.slice(0, 6).map((serviceSlug, index) => {
    const service = services[serviceSlug];
    const issue = service.issues[index % service.issues.length];
    return `<div class="local-feature"><h3>${escapeHtml(service.label)}</h3><p>${escapeHtml(issue[0])}: ${escapeHtml(issue[1])}</p></div>`;
  }).join("\n");
  const serviceLinks = primaryServices.map((serviceSlug) => `<li><a href="https://alex-repair.com/${serviceSlug}-repair.html">${escapeHtml(services[serviceSlug].label)}</a></li>`).join("\n");
  const areaLinks = Object.entries(cities).map(([citySlug, city]) => `<li><a href="https://alex-repair.com/${citySlug}.html">${escapeHtml(city.name)}</a></li>`).join("\n");
  return `<main class="local-seo-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb">
  <div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li><li><a href="https://alex-repair.com/brands.html">Brands</a></li><li aria-current="page">${escapeHtml(shortName)}</li></ol></div>
</nav>

<section class="local-hero">
  <div class="local-hero-media"><img src="../images/service-maintenance-worker-repairing.webp" alt="Professional appliance diagnosis and repair" width="1536" height="900" fetchpriority="high"></div>
  <div class="local-shell local-hero-content">
    <img class="local-brand-logo" src="../${brand.logo}" alt="${escapeHtml(shortName)} brand logo" width="180" height="72">
    <p class="local-eyebrow">Independent local appliance service</p>
    <h1>${escapeHtml(brand.name)} in the Indianapolis Area</h1>
    <p class="local-hero-lead">${escapeHtml(brand.description)} Service is available across Carmel, Fishers, Westfield, Noblesville, McCordsville and Zionsville, subject to model and parts support.</p>
    <div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a></div>
  </div>
</section>

<section class="local-section">
  <div class="local-shell">
    <header class="local-section-header">
      <p class="local-eyebrow">Brand-focused diagnosis</p>
      <h2>${escapeHtml(shortName)} appliances we commonly evaluate</h2>
      <p>${escapeHtml(brandNote)}</p>
    </header>
    <div class="local-grid local-grid--three">${issueCards}</div>
  </div>
</section>

<section class="local-section local-section--soft">
  <div class="local-shell local-coverage">
    <div class="local-copy">
      <p class="local-eyebrow">One brand page, six local routes</p>
      <h2>Service without duplicate city-brand pages</h2>
      <p>This consolidated ${escapeHtml(shortName)} page replaces substantially similar city-specific brand pages. It keeps brand information in one useful location while the city pages describe local scheduling and coverage.</p>
      <p>For ${escapeHtml(shortName)}, the model and serial number identify the correct service documentation and part family. Diagnosis may include error-code review, operating checks, electrical measurements and inspection of the utility connections that apply to the appliance.</p>
      <p>The service call is $89 and is waived when the quoted repair is completed. Completed repairs include a 12-month parts and labor warranty under the applicable service terms.</p>
    </div>
    <aside class="local-coverage-aside">
      <h3>Service categories</h3>
      <ul>${primaryServices.map((serviceSlug) => `<li>${escapeHtml(services[serviceSlug].label)}</li>`).join("\n")}</ul>
    </aside>
  </div>
</section>

<section class="local-section local-section--blue">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">Before the appointment</p><h2>Information that improves preparation</h2></header>
    <ol class="local-process">
      <li><strong>Model number</strong>Usually found on a label inside the door, cabinet or storage compartment.</li>
      <li><strong>Exact symptom</strong>Note when the problem begins, any code shown and whether it is intermittent.</li>
      <li><strong>Installation</strong>Tell us if the unit is built in, stacked, panel-ready or difficult to access.</li>
      <li><strong>Previous work</strong>Share recent parts, leaks, power events or other repair history when known.</li>
    </ol>
  </div>
</section>

<section class="local-section">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">Choose a route or appliance</p><h2>Related service pages</h2></header>
    <ul class="local-link-list">${areaLinks}${serviceLinks}</ul>
    <p class="local-disclaimer">Alex Appliance Repair is an independent repair provider operated by Aksenov LLC. It is not an authorized warranty service center for ${escapeHtml(shortName)}, and brand names are used only to identify the appliances serviced.</p>
  </div>
</section>

<section class="local-cta">
  <div class="local-shell local-cta-row"><div><h2>Schedule ${escapeHtml(brand.name)}</h2><p>Include the model number and current symptom when booking.</p></div><a class="local-button" href="${BOOKING_URL}">Book service online</a></div>
</section>
</main>`;
}

function rebuildBrandPages() {
  const brands = parseBrandCards();
  const template = read("fishers/dryer-repair-services.html");
  for (const brand of brands) {
    const brandServices = inferBrandServices(brand);
    const shortName = brand.name.replace(/ Appliance Repair$/i, "");
    const title = `${shortName} Appliance Repair Indianapolis Area | Alex`;
    const categories = brandServices.slice(0, 4).map((slug) => services[slug].singular).join(", ");
    const description = `${shortName} appliance repair for ${categories || "household appliances"} across Indianapolis, Carmel, Fishers and nearby communities. Independent local service.`;
    let html = updateHead(template, {
      title,
      description,
      canonical: `https://alex-repair.com/brands/${brand.slug}-appliance-repair.html`,
      image: brand.logo,
      schema: brandSchema(brand, brandServices),
      nested: true
    });
    html = html.replace(/<main[\s\S]*?<\/main>/i, renderBrandMain(brand, brandServices));
    write(`brands/${brand.slug}-appliance-repair.html`, html);
  }
  return brands;
}

function updateBrandsDirectory(brands) {
  let html = read("brands.html");
  html = html.replace(
    "Select a brand, then choose your city to open the most relevant local repair page.",
    "Select a brand to view one consolidated repair page with supported appliance categories and links to every local service route."
  );
  for (const brand of brands) {
    const cardRegex = new RegExp(`(<article class="brand-directory-card" id="${brand.slug}">[\\s\\S]*?<p>[\\s\\S]*?<\\/p>)\\s*<div class="brand-city-links">[\\s\\S]*?<\\/div>`, "i");
    const link = `<div class="brand-city-links"><a href="https://alex-repair.com/brands/${brand.slug}-appliance-repair.html">View ${escapeHtml(brand.name)}</a></div>`;
    html = html.replace(cardRegex, `$1\n          ${link}`);
  }
  write("brands.html", html);
}

function allServiceAreasSchema() {
  return Object.values(cities).map((city) => ({
    "@type": "City",
    name: city.name,
    addressRegion: "IN",
    addressCountry: "US"
  }));
}

function coreServiceSchema(serviceSlug) {
  const service = services[serviceSlug];
  const url = `https://alex-repair.com/${serviceSlug}-repair.html`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...localBusinessSchema(cities.fishers),
        areaServed: allServiceAreasSchema()
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.label,
        serviceType: service.label,
        description: service.summary,
        url,
        provider: { "@id": "https://alex-repair.com/#business" },
        areaServed: allServiceAreasSchema(),
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "The service call is $89 and is waived when the quoted repair is completed."
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alex-repair.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://alex-repair.com/services.html" },
          { "@type": "ListItem", position: 3, name: service.label, item: url }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };
}

function extractCoreServiceGuide(html) {
  const marked = html.match(/<!-- CORE-GUIDE-START -->([\s\S]*?)<!-- CORE-GUIDE-END -->/i);
  if (marked) return marked[1].trim();
  const original = html.match(/<div class="desc-carmel">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="image-50">/i);
  if (original) return original[1].trim();
  return "";
}

function renderCoreServiceMain(serviceSlug, detailedGuide) {
  const service = services[serviceSlug];
  const cityLinks = Object.entries(cities)
    .map(([citySlug, city]) => `<li><a href="https://alex-repair.com/${citySlug}/${serviceSlug}-repair-services.html">${escapeHtml(service.label)} in ${escapeHtml(city.name)}</a></li>`)
    .join("\n");
  const relatedLinks = SERVICE_SLUGS
    .filter((slug) => slug !== serviceSlug)
    .map((slug) => `<li><a href="https://alex-repair.com/${slug}-repair.html">${escapeHtml(services[slug].label)}</a></li>`)
    .join("\n");
  return `<main class="local-seo-page unified-service-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb">
  <div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li><li><a href="https://alex-repair.com/services.html">Services</a></li><li aria-current="page">${escapeHtml(service.label)}</li></ol></div>
</nav>

<section class="local-hero">
  <div class="local-hero-media"><img src="images/${service.image}" alt="${escapeHtml(service.label)} by Alex Appliance Repair" width="1200" height="800" fetchpriority="high"></div>
  <div class="local-shell local-hero-content">
    <p class="local-eyebrow">Kitchen and laundry appliance service</p>
    <h1>${escapeHtml(service.label)} in the Indianapolis Area</h1>
    <p class="local-hero-lead">${escapeHtml(service.summary)} Appointments are available in Carmel, Fishers, Westfield, Noblesville, McCordsville and Zionsville.</p>
    <ul class="local-proof-list"><li>$89 service call</li><li>Fee waived with completed repair</li><li>12-month parts and labor warranty</li></ul>
    <div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a></div>
  </div>
</section>

<section class="local-section">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">Problems we diagnose</p><h2>Common ${escapeHtml(service.singular)} symptoms</h2><p>A visible symptom identifies the place to begin. Model-specific testing determines whether the cause is a component, installation condition or utility connection.</p></header>
    <div class="local-grid local-grid--three">${service.issues.map(([title, description]) => `<div class="local-feature"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div>`).join("\n")}</div>
  </div>
</section>

<section class="local-section local-section--soft">
  <div class="local-shell local-media-copy">
    <div class="local-media-frame"><img src="images/service-details.webp" alt="Professional appliance testing and diagnosis" width="900" height="720" loading="lazy"></div>
    <div class="local-copy">
      <p class="local-eyebrow">Diagnosis before parts</p>
      <h2>A repair recommendation based on testing</h2>
      <p>We review the reported symptom, inspect the appliance and test the systems related to the failure. The result and estimate are explained before a repair is approved.</p>
      <ul class="local-check-list">${service.components.map((component) => `<li>${escapeHtml(component)}</li>`).join("\n")}</ul>
      <p><strong>Safety note:</strong> ${escapeHtml(service.safety)}</p>
    </div>
  </div>
</section>

<section class="local-section local-section--blue">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">A clear service visit</p><h2>From booking to final test</h2></header>
    <ol class="local-process">
      <li><strong>Share the details</strong>Provide the brand, model, symptom, error code and service address.</li>
      <li><strong>Inspect and test</strong>The technician checks the appliance and conditions connected to the failure.</li>
      <li><strong>Review the estimate</strong>You receive an explanation and repair option before work continues.</li>
      <li><strong>Repair and verify</strong>Approved work is completed and tested under applicable operating conditions.</li>
    </ol>
  </div>
</section>

${detailedGuide ? `<section class="local-section local-service-guide">
  <div class="local-shell local-article-copy">
    <p class="local-eyebrow">Detailed service guide</p>
    <!-- CORE-GUIDE-START -->
${detailedGuide}
    <!-- CORE-GUIDE-END -->
  </div>
</section>` : ""}

<section class="local-section local-section--soft">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">Local service routes</p><h2>Choose your city for local ${escapeHtml(service.label.toLowerCase())}</h2><p>Each city page contains route, ZIP code and local scheduling information for this appliance category.</p></header>
    <ul class="local-link-list">${cityLinks}</ul>
  </div>
</section>

<section class="local-section">
  <div class="local-shell">
    <header class="local-section-header"><p class="local-eyebrow">Frequently asked questions</p><h2>${escapeHtml(service.label)} questions</h2></header>
    <div class="local-faq-list">${service.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("\n")}</div>
    <ul class="local-link-list">${relatedLinks}</ul>
  </div>
</section>

<section class="local-cta">
  <div class="local-shell local-cta-row"><div><h2>Schedule ${escapeHtml(service.label.toLowerCase())}</h2><p>Include the model number and current symptom when possible.</p></div><a class="local-button" href="${BOOKING_URL}">Book service online</a></div>
</section>
</main>`;
}

function rebuildCoreServicePages() {
  for (const serviceSlug of SERVICE_SLUGS) {
    const relativePath = `${serviceSlug}-repair.html`;
    let html = read(relativePath);
    const service = services[serviceSlug];
    const guide = extractCoreServiceGuide(html);
    const existingTitle = decodeHtmlEntities(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || `${service.label} Indianapolis Area | Alex Appliance Repair`);
    const existingDescription = decodeHtmlEntities(html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i)?.[1] || `${service.label} for ${service.metaIssues} across Carmel, Fishers, Westfield, Noblesville, McCordsville and Zionsville.`);
    html = updateHead(html, {
      title: existingTitle,
      description: existingDescription,
      canonical: `https://alex-repair.com/${relativePath}`,
      image: `images/${service.image}`,
      schema: coreServiceSchema(serviceSlug),
      nested: false
    });
    html = html.replace(/<main[\s\S]*?<\/main>/i, renderCoreServiceMain(serviceSlug, guide));
    write(relativePath, html);
  }
}

function renderServicesMain() {
  const cards = SERVICE_SLUGS.map((serviceSlug) => {
    const service = services[serviceSlug];
    return `<article class="local-service-card">
      <a class="local-service-card-media" href="https://alex-repair.com/${serviceSlug}-repair.html"><img src="images/${service.image}" alt="${escapeHtml(service.label)}" width="720" height="520" loading="lazy"></a>
      <div class="local-service-card-copy"><h2><a href="https://alex-repair.com/${serviceSlug}-repair.html">${escapeHtml(service.label)}</a></h2><p>${escapeHtml(service.summary)}</p><a class="local-text-link" href="https://alex-repair.com/${serviceSlug}-repair.html">View service details</a></div>
    </article>`;
  }).join("\n");
  const cityLinks = Object.entries(cities).map(([slug, city]) => `<li><a href="https://alex-repair.com/${slug}.html">Appliance Repair in ${escapeHtml(city.name)}</a></li>`).join("\n");
  return `<main class="local-seo-page unified-services-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb"><div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li><li aria-current="page">Services</li></ol></div></nav>
<section class="local-hero">
  <div class="local-hero-media"><img src="images/service-maintenance-worker-repairing.webp" alt="Alex Appliance Repair technician servicing a household appliance" width="1536" height="900" fetchpriority="high"></div>
  <div class="local-shell local-hero-content"><p class="local-eyebrow">Kitchen and laundry appliance service</p><h1>Appliance Repair Services in the Indianapolis Area</h1><p class="local-hero-lead">Model-specific diagnosis and repair for refrigerators, washers, dryers, dishwashers, cooking appliances, microwaves and freezers across six Central Indiana service routes.</p><ul class="local-proof-list"><li>$89 service call</li><li>Fee waived with completed repair</li><li>12-month parts and labor warranty</li></ul><div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a></div></div>
</section>
<section class="local-section"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">Choose an appliance</p><h2>Repair services for the equipment in your home</h2><p>Open the service guide that matches the appliance. Each page explains common symptoms, diagnostic steps and direct links to city-specific coverage.</p></header><div class="local-service-card-grid">${cards}</div></div></section>
<section class="local-section local-section--blue"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">Repair process</p><h2>Clear information at every step</h2></header><ol class="local-process"><li><strong>Book</strong>Share the appliance, model, symptom and address.</li><li><strong>Diagnose</strong>We inspect and test the systems related to the failure.</li><li><strong>Approve</strong>You review the recommendation and estimate.</li><li><strong>Verify</strong>Approved work is completed and tested.</li></ol></div></section>
<section class="local-section local-section--soft"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">Central Indiana routes</p><h2>Local appliance repair pages</h2><p>Use the city page for neighborhood coverage, ZIP codes and scheduling information.</p></header><ul class="local-link-list">${cityLinks}</ul></div></section>
<section class="local-cta"><div class="local-shell local-cta-row"><div><h2>Tell us which appliance needs help</h2><p>Have the model number and error code ready when available.</p></div><a class="local-button" href="${BOOKING_URL}">Book service online</a></div></section>
</main>`;
}

function locationsSchema() {
  const url = "https://alex-repair.com/locations.html";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...localBusinessSchema(cities.fishers),
        areaServed: allServiceAreasSchema()
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Appliance Repair Service Areas Near Indianapolis",
        description: "Local appliance repair routes for Carmel, Fishers, Westfield, Noblesville, McCordsville and Zionsville, Indiana.",
        about: { "@id": "https://alex-repair.com/#business" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: Object.entries(cities).map(([slug, city], index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${city.name} Appliance Repair`,
            url: `https://alex-repair.com/${slug}.html`
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alex-repair.com/" },
          { "@type": "ListItem", position: 2, name: "Service Areas", item: url }
        ]
      }
    ]
  };
}

function renderLocationsMain() {
  const cityCards = Object.entries(cities).map(([slug, city]) => `<article class="local-service-card">
    <a class="local-service-card-media" href="https://alex-repair.com/${slug}.html"><img src="images/${city.hero}" alt="Appliance repair service in ${escapeHtml(city.name)}, Indiana" width="720" height="520" loading="lazy"></a>
    <div class="local-service-card-copy"><p class="local-eyebrow">${escapeHtml(city.county)}</p><h2><a href="https://alex-repair.com/${slug}.html">${escapeHtml(city.name)} Appliance Repair</a></h2><p>Service in ZIP ${city.zipCodes.join(", ")} and nearby neighborhoods including ${escapeHtml(city.areas.slice(0, 3).join(", "))}.</p><a class="local-text-link" href="https://alex-repair.com/${slug}.html">View ${escapeHtml(city.name)} service details</a></div>
  </article>`).join("\n");
  const serviceLinks = SERVICE_SLUGS.map((slug) => `<li><a href="https://alex-repair.com/${slug}-repair.html">${escapeHtml(services[slug].label)}</a></li>`).join("\n");
  return `<main class="local-seo-page unified-locations-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb"><div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li><li aria-current="page">Service Areas</li></ol></div></nav>
<section class="local-hero">
  <div class="local-hero-media"><img src="images/service-call.webp" alt="Alex Appliance Repair service routes near Indianapolis" width="1536" height="900" fetchpriority="high"></div>
  <div class="local-shell local-hero-content"><p class="local-eyebrow">Based in Indianapolis, serving nearby communities</p><h1>Appliance Repair Service Areas Near Indianapolis</h1><p class="local-hero-lead">Choose your city for local ZIP codes, neighborhood coverage and direct links to refrigerator, washer, dryer, dishwasher and cooking-appliance service.</p><ul class="local-proof-list"><li>Six published local routes</li><li>$89 service call, waived with repair</li><li>12-month parts and labor warranty</li></ul><div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a></div></div>
</section>
<section class="local-section"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">Choose your city</p><h2>Published local appliance repair routes</h2><p>Each city page identifies the areas we serve and connects to appliance-specific local pages. City references describe service coverage and do not represent separate storefronts.</p></header><div class="local-service-card-grid">${cityCards}</div></div></section>
<section class="local-section local-section--blue"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">How scheduling works</p><h2>Appointments are planned around real route capacity</h2></header><ol class="local-process"><li><strong>Address</strong>We confirm that the service address is within the active route.</li><li><strong>Appliance</strong>Brand, model and symptoms help estimate diagnostic time.</li><li><strong>Window</strong>An available arrival window is confirmed before dispatch.</li><li><strong>Updates</strong>We communicate if traffic or an earlier repair changes timing.</li></ol></div></section>
<section class="local-section local-section--soft"><div class="local-shell local-coverage"><div class="local-copy"><p class="local-eyebrow">Kitchen and laundry service</p><h2>One service standard across every route</h2><p>We inspect the reported failure, explain the recommendation and test approved work before the appointment is closed. Availability varies by location, appliance type and required parts.</p></div><aside class="local-coverage-aside"><h3>Appliances serviced</h3><ul>${serviceLinks}</ul></aside></div></section>
<section class="local-cta"><div class="local-shell local-cta-row"><div><h2>Check availability for your address</h2><p>Share the city, appliance, model number and current symptom.</p></div><a class="local-button" href="${BOOKING_URL}">Book service online</a></div></section>
</main>`;
}

function renderAboutMain() {
  const serviceLinks = SERVICE_SLUGS.map((slug) => `<li><a href="https://alex-repair.com/${slug}-repair.html">${escapeHtml(services[slug].label)}</a></li>`).join("\n");
  const cityLinks = Object.entries(cities).map(([slug, city]) => `<li><a href="https://alex-repair.com/${slug}.html">${escapeHtml(city.name)}, IN</a></li>`).join("\n");
  return `<main class="local-seo-page unified-about-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb"><div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li><li aria-current="page">About</li></ol></div></nav>
<section class="local-hero">
  <div class="local-hero-media"><img src="images/about-washer-repair-technician.webp" alt="Alex Appliance Repair technician working on a household appliance" width="1536" height="900" fetchpriority="high"></div>
  <div class="local-shell local-hero-content"><p class="local-eyebrow">Aksenov LLC operates as Alex Appliance Repair</p><h1>Local Appliance Repair With Clear Answers</h1><p class="local-hero-lead">Owner-operated appliance service for Central Indiana homes, focused on careful diagnosis, an explained estimate and a repair that is tested before the visit is complete.</p><div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a></div></div>
</section>
<section class="local-section"><div class="local-shell local-media-copy"><div class="local-media-frame"><img src="images/about-img.webp" alt="Professional appliance service by Alex Appliance Repair" width="900" height="720" loading="lazy"></div><div class="local-copy"><p class="local-eyebrow">About the business</p><h2>Practical service built around the actual failure</h2><p>Alex Appliance Repair is the customer-facing trade name operated by Aksenov LLC, a local Indiana appliance repair business. We service household kitchen and laundry appliances at customer locations throughout our published service area.</p><p>The goal is straightforward: collect useful details before the visit, test the appliance instead of guessing, explain what was found and complete approved work with respect for the home.</p><p>The service call is $89 and is waived when the quoted repair is completed. Completed repairs include a 12-month parts and labor warranty under the applicable service terms.</p></div></div></section>
<section class="local-section local-section--soft"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">What customers can expect</p><h2>Standards that guide each appointment</h2></header><div class="local-grid local-grid--three"><div class="local-feature"><h3>Prepared scheduling</h3><p>Brand, model, symptom and address information help us plan the route and research the appliance.</p></div><div class="local-feature"><h3>Measured diagnosis</h3><p>Operating checks, visual inspection and applicable electrical, temperature, airflow or water tests support the recommendation.</p></div><div class="local-feature"><h3>Clear estimate</h3><p>The failure and repair option are explained before approved work begins.</p></div><div class="local-feature"><h3>Home protection</h3><p>Work areas are protected and appliance access is planned around the installation.</p></div><div class="local-feature"><h3>Final verification</h3><p>The appliance is tested under applicable conditions after the repair.</p></div><div class="local-feature"><h3>Documented warranty</h3><p>Completed repairs are backed by a 12-month parts and labor warranty under the service terms.</p></div></div></div></section>
<section class="local-section local-section--blue"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">Service categories</p><h2>Kitchen and laundry appliance repair</h2></header><ul class="local-link-list local-link-list--on-blue">${serviceLinks}</ul></div></section>
<section class="local-section"><div class="local-shell local-coverage"><div class="local-copy"><p class="local-eyebrow">Service area</p><h2>Six local Central Indiana routes</h2><p>Appointments are organized by address, appliance type, expected diagnostic time and current technician availability. City references describe service coverage and do not represent separate office locations.</p></div><aside class="local-coverage-aside"><h3>Local pages</h3><ul>${cityLinks}</ul></aside></div></section>
<section class="local-cta"><div class="local-shell local-cta-row"><div><h2>Schedule local appliance service</h2><p>Share the appliance details and choose an available appointment.</p></div><a class="local-button" href="${BOOKING_URL}">Book service online</a></div></section>
</main>`;
}

function extractContactForm(html) {
  return html.match(/<form class="contact-form"[\s\S]*?<\/form>/i)?.[0] || "";
}

function contactModalMarkup() {
  return `<div class="request-service-modal" id="request-service-modal" aria-hidden="true">
  <div class="request-service-modal-backdrop" data-modal-close></div>
  <div class="request-service-modal-card" role="dialog" aria-modal="true" aria-labelledby="request-service-modal-title">
    <button class="request-service-modal-close" type="button" aria-label="Close message" data-modal-close>&times;</button>
    <h2 id="request-service-modal-title">Thank you for your request!</h2>
    <p>We appreciate you choosing Alex Appliance Repair. Your service request has been sent, and we will respond within about 30 minutes during working hours.</p>
    <button class="button-v1" type="button" data-modal-close>Close</button>
  </div>
</div>`;
}

function renderContactMain(form, modal) {
  const cityLinks = Object.entries(cities).map(([slug, city]) => `<li><a href="https://alex-repair.com/${slug}.html">${escapeHtml(city.name)}</a></li>`).join("\n");
  return `<main class="local-seo-page unified-contact-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb"><div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li><li aria-current="page">Contact</li></ol></div></nav>
<section class="local-hero">
  <div class="local-hero-media"><img src="images/service-call.webp" alt="Book local appliance repair service" width="1536" height="900" fetchpriority="high"></div>
  <div class="local-shell local-hero-content"><p class="local-eyebrow">Contact Alex Appliance Repair</p><h1>Book Appliance Repair in Central Indiana</h1><p class="local-hero-lead">Tell us which appliance is not working, where service is needed and what symptom you see. Photos of the model label can help us prepare.</p><div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a></div></div>
</section>
<section class="local-contact-strip"><div class="local-shell local-contact-strip-grid"><div><strong>Phone</strong><a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a></div><div><strong>Email</strong><a href="mailto:alexeasyrepair@gmail.com">alexeasyrepair@gmail.com</a></div><div><strong>Hours</strong><span>Daily, 8:00 a.m. - 6:00 p.m.</span></div></div></section>
<section class="local-section local-section--soft"><div class="local-shell local-contact-layout"><div class="local-contact-form"><p class="local-eyebrow">Service request</p><h2>Send appliance details</h2><p>Required fields help us respond with the right scheduling questions.</p>${form}</div><aside class="local-contact-aside"><div class="local-contact-map"><iframe title="Alex Appliance Repair service area in Central Indiana" src="https://www.google.com/maps?q=39.9784,-86.1180&amp;ll=39.9784,-86.1180&amp;z=11&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><h2>Service area</h2><ul>${cityLinks}</ul><p>Alex Appliance Repair is operated by Aksenov LLC. Service is provided at customer locations.</p></aside></div></section>
<section class="local-section"><div class="local-shell"><header class="local-section-header"><p class="local-eyebrow">Before submitting</p><h2>Details that help us prepare</h2></header><div class="local-grid local-grid--three"><div class="local-feature"><h3>Model number</h3><p>Usually found inside a door, cabinet, drawer or storage compartment.</p></div><div class="local-feature"><h3>Current symptom</h3><p>Include error codes, unusual sounds, leaks and the cycle stage where operation stops.</p></div><div class="local-feature"><h3>Installation access</h3><p>Tell us if the appliance is stacked, built in, panel-ready or difficult to move.</p></div></div></div></section>
${modal}
</main>`;
}

function rebuildInformationPages() {
  let servicesHtml = ensureLocalSeoCss(read("services.html"));
  servicesHtml = servicesHtml.replace(/<main[\s\S]*?<\/main>/i, renderServicesMain());
  write("services.html", servicesHtml);

  let locationsHtml = fs.existsSync(path.join(ROOT, "locations.html")) ? read("locations.html") : servicesHtml;
  locationsHtml = updateHead(locationsHtml, {
    title: "Appliance Repair Service Areas Near Indianapolis | Alex Appliance Repair",
    description: "Explore Alex Appliance Repair service areas for Carmel, Fishers, Westfield, Noblesville, McCordsville and Zionsville, Indiana. Book local appliance service.",
    canonical: "https://alex-repair.com/locations.html",
    image: "images/service-call.webp",
    schema: locationsSchema(),
    nested: false
  });
  locationsHtml = locationsHtml.replace(/<main[\s\S]*?<\/main>/i, renderLocationsMain());
  write("locations.html", locationsHtml);

  let aboutHtml = ensureLocalSeoCss(read("about.html"));
  aboutHtml = aboutHtml.replace(/<main[\s\S]*?<\/main>/i, renderAboutMain());
  write("about.html", aboutHtml);

  let contactHtml = ensureLocalSeoCss(read("contacts.html"));
  const form = extractContactForm(contactHtml);
  const mainStart = contactHtml.indexOf("<main");
  const footerStart = contactHtml.lastIndexOf('<footer class="footer">');
  if (mainStart === -1 || footerStart === -1) {
    throw new Error("Unable to identify the contact page main and footer boundaries.");
  }
  contactHtml = `${contactHtml.slice(0, mainStart)}${renderContactMain(form, contactModalMarkup())}\n\n${contactHtml.slice(footerStart)}`;
  write("contacts.html", contactHtml);

  let brandsHtml = ensureLocalSeoCss(read("brands.html"));
  if (!brandsHtml.includes("unified-brands-page")) {
    const directorySection = brandsHtml.match(/<section class="brands-directory-section"[\s\S]*?<\/section>/i)?.[0] || "";
    const main = `<main class="local-seo-page brands-directory unified-brands-page">
<nav class="local-breadcrumbs" aria-label="Breadcrumb"><div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li><li aria-current="page">Brands</li></ol></div></nav>
<section class="local-hero"><div class="local-hero-media"><img src="images/repair-room.webp" alt="Appliance brands serviced by Alex Appliance Repair" width="1536" height="900" fetchpriority="high"></div><div class="local-shell local-hero-content"><p class="local-eyebrow">Independent appliance repair</p><h1>Appliance Brands We Service</h1><p class="local-hero-lead">Browse one consolidated page for each supported brand, with appliance categories and links to local service routes across Central Indiana.</p><div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a></div></div></section>
${directorySection}
<section class="local-cta"><div class="local-shell local-cta-row"><div><h2>Have the model number ready</h2><p>Brand and model details help confirm documentation and parts support.</p></div><a class="local-button" href="${BOOKING_URL}">Book service online</a></div></section>
</main>`;
    brandsHtml = brandsHtml.replace(/<main[\s\S]*?<\/main>/i, main);
  }
  write("brands.html", brandsHtml);
}

function unifiedBreadcrumb(currentLabel, includeBlog = false) {
  return `<nav class="local-breadcrumbs" aria-label="Breadcrumb"><div class="local-shell"><ol><li><a href="https://alex-repair.com/">Home</a></li>${includeBlog ? '<li><a href="https://alex-repair.com/blog.html">Blog</a></li>' : ""}<li aria-current="page">${currentLabel}</li></ol></div></nav>`;
}

function rebuildBlogArchives() {
  for (const relativePath of BLOG_ARCHIVES) {
    let html = ensureLocalSeoCss(read(relativePath));
    if (html.includes("unified-blog-page")) {
      write(relativePath, html);
      continue;
    }
    const heading = html.match(/<div class="alex-blog-heading">[\s\S]*?<h1>([\s\S]*?)<\/h1>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<\/div>/i);
    const h1 = heading?.[1]?.trim() || "Appliance Repair Blog";
    const lead = heading?.[2]?.trim() || "Practical appliance repair and maintenance information for Central Indiana homeowners.";
    const hero = `<section class="local-hero local-hero--content"><div class="local-hero-media"><img src="images/repair-room.webp" alt="Appliance repair guides from Alex Appliance Repair" width="1536" height="900" fetchpriority="high"></div><div class="local-shell local-hero-content"><p class="local-eyebrow">Appliance repair resources</p><h1>${h1}</h1><p class="local-hero-lead">${lead}</p><div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="https://alex-repair.com/services.html">Browse services</a></div></div></section>`;
    html = html.replace(/<main>/i, '<main class="local-seo-page unified-blog-page">');
    html = html.replace(/<section class="breadcrumbs-wrap">[\s\S]*?<\/section>/i, `${unifiedBreadcrumb("Blog")}\n${hero}`);
    html = html.replace(/<div class="alex-blog-heading">[\s\S]*?<\/div>/i, "");
    write(relativePath, html);
  }
}

function rebuildBlogArticles() {
  for (const relativePath of BLOG_ARTICLES) {
    let html = ensureLocalSeoCss(read(relativePath));
    if (ARTICLE_HERO_OVERRIDES[relativePath] && html.includes("local-hero--article")) {
      html = html.replace(
        /(<section class="local-hero local-hero--article">[\s\S]*?<img\s+src=")[^"]+/i,
        `$1${ARTICLE_HERO_OVERRIDES[relativePath]}`
      );
    }
    html = html.replace(
      /(<article class="alex-article-card">)\s*<h1[\s\S]*?<\/h1>\s*(?:<div class="alex-article-source-meta">[\s\S]*?<\/div>\s*)?<\/div>\s*/i,
      "$1\n"
    );
    if (html.includes("unified-article-page")) {
      write(relativePath, html);
      continue;
    }
    const title = html.match(/<div class="alex-article-header">[\s\S]*?<h1>([\s\S]*?)<\/h1>/i)?.[1]?.trim() || "Appliance Repair Guide";
    const meta = html.match(/<div class="alex-article-meta">([\s\S]*?)<\/div>/i)?.[1]?.trim() || "Appliance Repair Guide";
    const heroImage = ARTICLE_HERO_OVERRIDES[relativePath] || html.match(/<div class="alex-article-hero">[\s\S]*?<img[^>]+src=["']([^"']+)["'][^>]*>/i)?.[1] || "images/repair-room.webp";
    const heroAlt = html.match(/<div class="alex-article-hero">[\s\S]*?<img[^>]+alt=["']([^"']*)["'][^>]*>/i)?.[1] || "Appliance repair guide";
    const hero = `<section class="local-hero local-hero--article"><div class="local-hero-media"><img src="${heroImage}" alt="${escapeHtml(heroAlt)}" width="1536" height="900" fetchpriority="high"></div><div class="local-shell local-hero-content"><p class="local-eyebrow">${meta}</p><h1>${title}</h1><p class="local-hero-lead">Practical guidance from Alex Appliance Repair for understanding appliance symptoms, maintenance decisions and the point where professional diagnosis is appropriate.</p><div class="local-actions"><a class="local-button" href="${BOOKING_URL}">Book service online</a><a class="local-button local-button--secondary" href="https://alex-repair.com/blog.html">More repair guides</a></div></div></section>`;
    html = html.replace(/<main>/i, '<main class="local-seo-page unified-article-page">');
    html = html.replace(/<section class="breadcrumbs-wrap">[\s\S]*?<\/section>/i, `${unifiedBreadcrumb(title, true)}\n${hero}`);
    html = html.replace(/<div class="alex-article-header">[\s\S]*?(?=<div class="alex-article-hero">)/i, "");
    html = html.replace(/<div class="alex-article-hero">[\s\S]*?<\/div>/i, "");
    write(relativePath, html);
  }
}

function rebuildUnifiedContentPages() {
  rebuildCoreServicePages();
  rebuildInformationPages();
  rebuildBlogArchives();
  rebuildBlogArticles();
}

function syncCityScripts() {
  const sharedScript = read("js/script.js");
  write("js/script.js", sharedScript);
  for (const citySlug of CITY_SLUGS) {
    write(`${citySlug}/js/script.js`, sharedScript);
  }
}

function replaceLegacyInternalLinks() {
  const htmlFiles = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === ".git" || entry.name === "private") continue;
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(fullPath);
    }
  };
  walk(ROOT);
  for (const fullPath of htmlFiles) {
    let html = fs.readFileSync(fullPath, "utf8");
    const before = html;
    html = html.replace(
      /https:\/\/alex-repair\.com\/(?:carmel|fishers|westfield|noblesville|mccordsville|zionsville)\/([a-z0-9-]+)-appliance-repair\.html/g,
      "https://alex-repair.com/brands/$1-appliance-repair.html"
    );
    html = html.replace(
      /\/(?:carmel|fishers|westfield|noblesville|mccordsville|zionsville)\/([a-z0-9-]+)-appliance-repair\.html/g,
      "/brands/$1-appliance-repair.html"
    );
    html = html.replace(
      /https:\/\/alex-repair\.com\/blog-(carmel|fishers|westfield|noblesville|mccordsville|zionsville)-(refrigerator|washer|dryer|dishwasher|stove|microwave|cooktop|freezer)-repair\.html/g,
      "https://alex-repair.com/$1/$2-repair-services.html"
    );
    html = html.replace(
      /https:\/\/alex-repair\.com\/(refrigerator|washer|dryer|dishwasher|stove|microwave|cooktop|freezer)-repair-fishers-indiana\.html/g,
      "https://alex-repair.com/fishers/$1-repair-services.html"
    );
    html = html.replace(
      /\b(refrigerator|washer|dryer|dishwasher|stove|microwave|cooktop|freezer)-repair-fishers-indiana\.html/g,
      "fishers/$1-repair-services.html"
    );
    html = html.replace(
      /<a\s+href=["']#["']>Locations<\/a>/g,
      '<a href="https://alex-repair.com/locations.html">Locations</a>'
    );
    if (html !== before) fs.writeFileSync(fullPath, html, "utf8");
  }
}

function rebuildSitemap(brands) {
  let xml = read("sitemap.xml");
  const blocks = [...xml.matchAll(/\s*<url>[\s\S]*?<\/url>/g)].map((match) => match[0]);
  const kept = [];
  const removedPattern = new RegExp(
    `https://alex-repair\\.com/(?:${CITY_SLUGS.join("|")})/[a-z0-9-]+-appliance-repair\\.html|` +
    `https://alex-repair\\.com/blog-(?:${CITY_SLUGS.join("|")})-(?:${SERVICE_SLUGS.join("|")})-repair\\.html|` +
    "https://alex-repair\\.com/brands/[a-z0-9-]+-appliance-repair\\.html"
  );
  for (let block of blocks) {
    const locationMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locationMatch || removedPattern.test(locationMatch[1])) continue;
    const location = locationMatch[1];
    if (
      CITY_SLUGS.some((citySlug) => location === `https://alex-repair.com/${citySlug}.html`) ||
      CITY_SLUGS.some((citySlug) => SERVICE_SLUGS.some((serviceSlug) => location === `https://alex-repair.com/${citySlug}/${serviceSlug}-repair-services.html`)) ||
      UNIFIED_PAGE_PATHS.has(location.replace("https://alex-repair.com/", "")) ||
      location === "https://alex-repair.com/brands.html"
    ) {
      block = block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${TODAY}</lastmod>`);
    }
    kept.push(block.trim());
  }
  const brandBlocks = brands.map((brand) => `<url>
    <loc>https://alex-repair.com/brands/${brand.slug}-appliance-repair.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>`);
  if (!kept.some((block) => block.includes("<loc>https://alex-repair.com/locations.html</loc>"))) {
    kept.push(`<url>
    <loc>https://alex-repair.com/locations.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`);
  }
  const opening = xml.slice(0, xml.indexOf("<url>")).trimEnd();
  xml = `${opening}\n${kept.concat(brandBlocks).join("\n")}\n</urlset>\n`;
  write("sitemap.xml", xml);
}

function main() {
  rebuildServicePages();
  rebuildMainCityPages();
  const brands = rebuildBrandPages();
  updateBrandsDirectory(brands);
  rebuildUnifiedContentPages();
  syncCityScripts();
  replaceLegacyInternalLinks();
  rebuildSitemap(brands);
  console.log(JSON.stringify({
    servicePages: Object.keys(cities).length * Object.keys(services).length,
    mainCityPages: CITY_SLUGS.length,
    brandPages: brands.length,
    unifiedPages: UNIFIED_PAGE_PATHS.size
  }, null, 2));
}

main();
