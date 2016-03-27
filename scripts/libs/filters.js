/**
 * Generate string from filter object
 * 
 * @param props object Object of filters
 * @param perc Number Percentage (from 0 to 1) of streng of effect
 * @returns string Css filter string
 */

const defaultValues = {
    saturate: 1,
    sepia: 0,
    contrast: 1,
    brightness: 1,
}

export default function genFilterCss(props, perc=1) {
    // blur(5px)
    // brighntess(0.5)
    // contrast %
    // grayscale
    // hue-rotate(90deg)
    // invert(43%)
    // saturate(30%)
    // sepia (60%)
    
    let str = "";
    
    for (let prop of Object.keys(props)) {
        let val = props[prop];
        if (prop in defaultValues) {
            const zer = defaultValues[prop];
            val = zer + (val - zer) * perc;
        }
        str += ` ${prop}(${val})`;
    }
 
    const result = `
      -webkit-filter: ${str};
    `;
    
    return result;
}

export const defaultPresets = [
     {
         name: 'Pr1',
         preset: {
                  sepia: 0.2,
                  contrast: 1.2,
                  brightness: 1.05,
                  saturate: 1.2
         }
     },
     { 
         name: 'Pr2',
         preset: {
                  brightness: 1.1,
                  "hue-rotate": "-10deg",
                  sepia: 0.3,
                  saturate: 1.6
         }
     }
];