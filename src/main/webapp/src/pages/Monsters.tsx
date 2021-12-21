import { Fragment } from "react";
import MonsterItem from "../components/Monster/MonsterItem";
import MonsterItemGroup from "../components/Monster/MonsterItemGroup";
import PageHeader from "../ui/PageHeader";

const Monsters = () => {
  return (
    <Fragment>
      <PageHeader
        title="Monsters"
        showButton={true}
        buttonTitle="New Monster"
        buttonColor="blue"
        path="/monsters/new"
      />
      <MonsterItemGroup />
    </Fragment>
  );
};

export default Monsters;
