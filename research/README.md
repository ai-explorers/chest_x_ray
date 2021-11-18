# Research

In view of the given dataset, the first thesis entitled "Entwicklung eines Deep Learning-basierten Assistenzsystems zur Klassifikation von Pneumonien anhand von Röntgenbildern" by Jan Raber investigates the current limitations of the prototype, which classifies CXR images according to pneumonia yes/no (stage 1), bacterial/viral (stage 2). Moreover a visualization component for this prototype has been implemented.

With respect to the Machine Learning approach used, the second thesis "Untersuchung von Ensemble-Learning zur Krankheitsklassifikation auf Thorax-Röntgenbildern" by Sebastian Steindl examines the limitations of this prototype in the algorithmic classification itself. Here, the focus lies not on the dataset, but on the steps (which extend to a re-implementation of the model) that are required to develop the prototype towards a pilot that allows a more reliable classification. For this, methods from current publications were analysed, implemented and combined (among other things by using Ensemble Learning) to perform a multi-label classification on the CheXpert dataset, which also takes the uncertainity from radiology reports into account. The final ensemble reached an average ROC-AUC of 0.917 on the five relevant labels of the hidden test set provided by the CheXpert competition.

## Theses Files (PDF)
- [Thesis: Entwicklung eines Deep Learning-basierten Assistenzsystems zur Klassifikation von Pneumonien anhand von Röntgenbildern](MA_JanRaber.pdf)
- [Thesis: Untersuchung von Ensemble-Learning zur Krankheitsklassifikation auf Thorax-Röntgenbildern](MA_SebastianSteindl.pdf)
