import * as yup from 'yup';

export class YupUtils {
    
    validateFildNotRequiredMinValue(minValue: number, message: string): any {
        return yup.string().when((val, schema) => {
            if (val) {  
               if(val.length > 0) { 
                 return yup.string().transform(
                        (value: string) => {
                        const valueFormated = value.split("")
                                            .map((val: string) => 
                                                val.replace("_", "").replace("-", "").replace("(", "").replace(")", "").replace("/", "")
                                            ).join("").toString();
                        return valueFormated;
                        }
                    ).min(minValue, message);
              } else { 
                 return yup.string().notRequired();
              }
       
            } else {
                 return yup.string().notRequired();
            }
         });
    }
}