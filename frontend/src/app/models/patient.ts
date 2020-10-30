
/**
 * Interface to represent the information of a patient on the dashboard page
 * 
 * @param name name of the patient
 * @param xRays array of x-ray images
 */
export interface Patient {
    name: string;
    xRays: Array<File>;
}