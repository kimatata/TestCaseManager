const priorities = [
  { name: "Critical", uid: "critical", color: "danger" },
  { name: "High", uid: "high", color: "warning" },
  { name: "Medium", uid: "medium", color: "secondary" },
  { name: "Low", uid: "low", color: "success" },
];

const testTypes = [
  { name: "Other", uid: "other" },
  { name: "Security", uid: "security" },
  { name: "Performance", uid: "performance" },
  { name: "Accessibility", uid: "accessibility" },
  { name: "Functional", uid: "functional" },
  { name: "Acceptance", uid: "acceptance" },
  { name: "Usability", uid: "usability" },
  { name: "Smoke&Sanity", uid: "smoke-sanity" },
  { name: "Compatibility", uid: "compatibility" },
  { name: "Destructive", uid: "destructive" },
  { name: "Regression", uid: "regression" },
  { name: "Automated", uid: "automated" },
  { name: "Manual", uid: "manual" },
];

const automationStatus = [
  { name: "Automated", uid: "automated" },
  { name: "Automation Not Required", uid: "automation-not-required" },
  { name: "Cannot Be Automated", uid: "cannot-be-automated" },
  { name: "Obsolete", uid: "obsolete" },
];

const templates = [
  { name: "Text", uid: "text-template" },
  { name: "Step", uid: "step-template" },
];

export { priorities, testTypes, automationStatus, templates };
