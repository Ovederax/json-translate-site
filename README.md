## JsonTranslate Site
In this repo you can see src of site  
You can visit site on url:  
http://ovederax.github.io/json-translate-site/
## API
Example of Google Script code: this_repo/src/google.gs  
You can host your gscript on your account if limits on my account expired  
  
```
Body: TransitedRequest  
Method: POST  
URL: https://script.google.com/macros/s/AKfycbyqQy1QZK3zafaETAegLUDx1KbCgcQuphyu-UAQUI2uDyeqQKWI/exec


type SupportedLanguage

interface TransitedRequest {
    fromLang: SupportedLanguage,  
    toLang: SupportedLanguage[],  
    data: object  example { 'keyOne': 'text', 'keyTwo': ['keyIn': 'text']}  
}  

interface TransitedResponse {  
    translates: TransitedItem[]  
}
interface TransitedItem {  
    lang: string,  
    data: object  
}  
```


