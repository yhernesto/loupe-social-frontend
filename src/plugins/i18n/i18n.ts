//https://github.com/intlify/vue-i18n-next/blob/master/examples/type-safe/global-type-definition/src/main.ts
import { createI18n } from "vue-i18n";

/**
 * import locale messages resource from json for global scope
 */
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import pt from "@/locales/pt.json";
import {DEFAULT_LANGUAGE} from "@/constants";

/**
 * setup vue-i18n with i18n resources with global type definition.
 * if you define the i18n resource schema in your `*.d.ts`, these is checked with typeScript.
 * you can check global type definition at `./vue-i18n.d.ts`
 */
const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: ["en", "es", "pt"],
  //formatFallbackMessages: true,
  messages: {
    en: en,
    es: es,
    pt: pt,
  },
  globalInjection: true,
});


export default i18n;