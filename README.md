# HCI/CST Questionaires

<img width="1502" height="807" alt="image" src="https://github.com/user-attachments/assets/f08f651b-8151-4c38-bd30-088f1929d1b1" />


## Questionaire Scales

### Usability

#### System Usability Scale (SUS)

`id: sus`

<https://digital.ahrq.gov/sites/default/files/docs/survey/systemusabilityscale%2528sus%2529_comp%255B1%255D.pdf>

> Brooke, J. (1996). SUS: A "quick and dirty" usability scale. In P. W. Jordan, B. Thomas, B. A. Weerdmeester, & A. L. McClelland (Eds.), Usability Evaluation in Industry (pp. 189-194). Taylor & Francis.

> Bangor, A., Kortum, P. T., & Miller, J. T. (2008). An empirical evaluation of the System Usability Scale. International Journal of Human-Computer Interaction, 24(6), 574-594.

#### Post-Study System Usability Questionnaire (PSSUQ)

`id: pssuq`

<https://uiuxtrend.com/wp-content/uploads/PSSUQ-Questionnaire-PDF-Template.pdf>

> Lewis, J. R. (1995). IBM computer usability satisfaction questionnaires: Psychometric evaluation and instructions for use. International Journal of Human-Computer Interaction, 7(1), 57-78.

#### Computer System Usability Questionnaire (CSUQ)

`id: csuq`

<https://garyperlman.com/quest/quest.cgi>

> Lewis, J. R. (1995). IBM computer usability satisfaction questionnaires: Psychometric evaluation and instructions for use. International Journal of Human-Computer Interaction, 7(1), 57-78.

#### Questionnaire for User Interaction Satisfaction (QUIS)

`id: quis`

### User Experience

#### AttrakDiff / AttrakDiff 2

<https://www.attrakdiff.de/sience-en.html>

> Hassenzahl, M., Burmester, M., & Koller, F. (2003). AttrakDiff: A questionnaire to measure pragmatic and hedonic qualities of interactive products. In Proceedings of Mensch & Computer 2003 (pp. 187-196).

### Task/Cognitive Workload

#### NASA Task Load Index (NASA-TLX)

`id: tlx`  
`id: tlx-pair`

<https://til-d.github.io/nasa-tlx/>

> Hart, Sandra G., and Lowell E. Staveland. 1988. “Development of NASA-TLX (Task Load Index): Results of Empirical and Theoretical Research.” In Advances in Psychology, edited by Peter A. Hancock and Najmedin Meshkati, 52:139–83. Advances in Psychology. Elsevier.

> Hart, S. G. (2006). NASA-Task Load Index (NASA-TLX); 20 years later. In Proceedings of the Human Factors and Ergonomics Society Annual Meeting, 50(9), 904-908.

#### Subjective Workload Assessment Technique (SWAT)

<https://www.sciencedirect.com/science/article/abs/pii/S0166411508623870>

> Reid, Gary B., and Thomas E. Nygren. 1988. “The Subjective Workload Assessment Technique: A Scaling Procedure for Measuring Mental Workload.” In Advances in Psychology, 52:185–218. Advances in Psychology. Elsevier.

> Zak, Yuval, Yisrael Parmet, and Tal Oron-Gilad. "Subjective Workload assessment technique (SWAT) in real time: Affordable methodology to continuously assess human operators’ workload." 2020 IEEE international conference on Systems, Man, and Cybernetics (SMC). IEEE, 2020.

### Technology Acceptance

#### Technology Acceptance Model (TAM)

<https://en.wikipedia.org/wiki/Technology_acceptance_model>
<https://quod.lib.umich.edu/b/busadwp/images/b/1/4/b1409190.0001.001.pdf>

> Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. MIS Quarterly, 13(3), 319-340.

> Venkatesh, V., & Davis, F. D. (2000). A theoretical extension of the Technology Acceptance Model: Four longitudinal field studies. Management Science, 46(2), 186-204.

#### Unified Theory of Acceptance and Use of Technology (UTAUT/UTAUT2)

`id: utaut`

<https://en.wikipedia.org/wiki/Unified_theory_of_acceptance_and_use_of_technology>
<https://thomasmore.be/en/care-and-well-being-people-and-well-being/questionnaire-utaut>

### Creativity of Tools

#### Creativity Support Index (CSI)

`id: csi`  
`id: csi-pair`

> Carroll, Erin A., and Celine Latulipe. 2009. “The Creativity Support Index.” In CHI ’09 Extended Abstracts on Human Factors in Computing Systems, 4009–14. CHI EA ’09. New York, NY, USA: Association for Computing Machinery.

> Cherry, Erin, and Celine Latulipe. 2014. “Quantifying the Creativity Support of Digital Tools through the Creativity Support Index.” ACM Transactions on Computer-Human Interaction: A Publication of the Association for Computing Machinery, 21, 21 (4): 1–25.

### Creativity of Participants

#### Divergent Thinking Tests

`id: dtt`

> Reiter-Palmon, Roni, Boris Forthmann, and Baptiste Barbot. "Scoring divergent thinking tests: A review and systematic framework." Psychology of Aesthetics, Creativity, and the Arts 13.2 (2019): 144.

#### Creative Achievement Questionnaire (CAQ)

`id: caq`

> Carson, S. H., Peterson, J. B., & Higgins, D. M. (2005). Reliability, validity, and factor structure of the Creative Achievement Questionnaire. Creativity Research Journal, 17(1), 37-50.

#### Kaufman Domains of Creativity Scale (K-DOCS)

`id: kdocs`

> Kaufman, James C. "Counting the muses: development of the Kaufman domains of creativity scale (K-DOCS)." Psychology of Aesthetics, Creativity, and the Arts 6.4 (2012): 298.

---

## Built with `React + TypeScript + Vite`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
