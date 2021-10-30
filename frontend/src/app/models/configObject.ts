
/**
 * Interface definition to represent the contents of config.json file
 * 
 * @param stage1_url backend URL for stage1 used by http.service
 * @param stage2_url backend URL for stage2 used by http.service
 * @param stage3_url backend URL for stage3 used by http.service
 */
export interface ConfigObject {
    backend: {
        stage1_url: string;
        stage2_url: string;
        stage3_url: string;
    };
}