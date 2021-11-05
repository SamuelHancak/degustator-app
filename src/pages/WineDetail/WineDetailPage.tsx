import React from "react";
import { Card } from "../../components/Card/Card";
import { useHistory, useParams } from "react-router-dom";
// styles
import "./WineDetailPage.css";
import { Tabs } from "../../components/Tabs/Tabs";

// testing data
const attributesVzhlad: IAttributeProps[] = [
  {
    name: "Čírosť",
    value: 5,
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Farba",
    value: 1,
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const attributesVona: IAttributeProps[] = [
  {
    name: "Intenzita",
    value: 5,
  },
  {
    name: "Čistota",
    value: 1,
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.",
  },
  {
    name: "Harmónia",
    value: 1,
  },
];

const attributesChut: IAttributeProps[] = [
  {
    name: "Čistota",
    value: 1,
  },
  {
    name: "Harmónia",
    value: 1,
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Perzistencia",
    value: 5,
  },
];

export const WineDetailPage = () => {
  const history = useHistory();
  const params = useParams<{ wineId: string }>();

  console.log(window.innerWidth);

  return (
    <>
      <Tabs
        activeTab={false}
        tabs={[
          { label: "Zoznam vín", onClick: () => history.push("/") },
          {
            label: "Pridať vzorku",
            onClick: () => history.push("/wines/create"),
          },
          {
            label: "Upraviť hodnotenie",
            onClick: () => history.push("/wines/rate/1"), //TODO
          },
          {
            label: "Odstránť vzorku",
            onClick: () => history.push("/"), //TODO
          },
        ]}
      />

      <Card className="card">
        <div className="cardHeader">
          <h1 className="cardTitle">Name of the wine</h1>

          <div className="cardTitleRatingWrapper">
            <p className="cardTitleRating">celkové hodnotenie</p>
            <h1 className="cardTitleRating">{params.wineId}</h1>
          </div>
        </div>
        <div className="cardContent">
          <AttributesSection name="Vzhľad" attributes={attributesVzhlad} />
          <AttributesSection name="Vôňa" attributes={attributesVona} />
          <AttributesSection name="Chuť" attributes={attributesChut} />
        </div>
      </Card>
    </>
  );
};

interface IAttributeProps {
  name: string;
  value: number;
  notes?: string;
}

interface IAttributesSectionProps {
  /**
   * Name of the attributes group
   */
  name: string;
  /**
   * Attributes array with values
   */
  attributes: IAttributeProps[];
}

const AttributesSection = ({ name, attributes }: IAttributesSectionProps) => {
  return (
    <div className="attributeSection">
      <div className="attributeSectionWrapper">
        <div className="attributesGroupNameWrapper">
          <span className="attributesGroupName">{name}</span>
          <span className="attributesGroupName attributesGroupNote">
            Poznámky
          </span>
        </div>

        {attributes.map(({ name, notes, value }) => (
          <div key={name} className="attributeWrapper">
            <div className="attributeValuesSection">
              <div className="attributeName">{name}</div>
              <div className="attributeValue">{value}</div>
            </div>

            <div className="attributeNotesSection">
              <div className="attributeNotes">{notes || "N/A"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
