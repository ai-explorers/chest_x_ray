import { SafeUrl } from "@angular/platform-browser";

/**
 * Interface definition for chest-x-ray prediction results
 * 
 * @param title name to be displayed as headline
 * @param urlImage resource url of the uploaded chest-x-ray image
 * @param urlCutout cutout of stage1 (binary mask * x-ray)
 * @param pneumoniaResult result of stage2 as string (pneumonia / normal)
 * @param pneumoniaPredictionValue numeral prediction value of stage2
 * @param viralResult result of stage3 as string (viral / bacterial)
 * @param viralPredictionValue numeral prediction value of stage3
 */

export interface PredictionResult {
    title: string,
    urlImage?: SafeUrl,
    urlCutout?: string,
    pneumoniaResult?: string,
    pneumoniaPredictionValue?: number,
    viralResult?: string,
    viralPredictionValue?: number,
}