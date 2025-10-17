import yaml from "js-yaml";
import type { Questionnaire } from "../types";

import attrakdiffYaml from "../data/attrakdiff.yaml?raw";
import caqYaml from "../data/caq.yaml?raw";
import csiPairYaml from "../data/csi-pair.yaml?raw";
import csiYaml from "../data/csi.yaml?raw";
import csuqYaml from "../data/csuq.yaml?raw";
import dttYaml from "../data/dtt.yaml?raw";
import kdocsYaml from "../data/kdocs.yaml?raw";
import pssuqYaml from "../data/pssuq.yaml?raw";
import quisYaml from "../data/quis.yaml?raw";
import susYaml from "../data/sus.yaml?raw";
import swatYaml from "../data/swat.yaml?raw";
import tamYaml from "../data/tam.yaml?raw";
import tlxPairYaml from "../data/tlx-pair.yaml?raw";
import tlxYaml from "../data/tlx.yaml?raw";
import utautYaml from "../data/utaut.yaml?raw";

const questionnaireData: Record<string, string> = {
  attrakdiff: attrakdiffYaml,
  caq: caqYaml,
  "csi-pair": csiPairYaml,
  csi: csiYaml,
  csuq: csuqYaml,
  dtt: dttYaml,
  kdocs: kdocsYaml,
  pssuq: pssuqYaml,
  quis: quisYaml,
  sus: susYaml,
  swat: swatYaml,
  tam: tamYaml,
  "tlx-pair": tlxPairYaml,
  tlx: tlxYaml,
  utaut: utautYaml,
};

export async function loadQuestionnaire(
  id: string
): Promise<Questionnaire | null> {
  try {
    const yamlContent = questionnaireData[id];
    if (!yamlContent) {
      console.error(`Questionnaire with id "${id}" not found`);
      return null;
    }

    const questionnaire = yaml.load(yamlContent) as Questionnaire;
    return questionnaire;
  } catch (error) {
    console.error("Error loading questionnaire:", error);
    return null;
  }
}

export function getAvailableQuestionnaires(): string[] {
  return Object.keys(questionnaireData);
}

export function loadAllQuestionnaires(): Promise<Questionnaire[]> {
  return Promise.all(
    Object.keys(questionnaireData).map((id) => loadQuestionnaire(id))
  ).then((questionnaires) =>
    questionnaires.filter((q): q is Questionnaire => q !== null)
  );
}
