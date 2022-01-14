import React from "react";
import { useNavigate } from "react-router-dom";
import { Header, Table, Image } from "semantic-ui-react";
import { getMemberImage } from "../../services/ImageService";
import { Member } from "../../types/Member";
import MemberStatusItem from "./MemberStatusItem";

interface PropTypes {
  member: Member;
  itemNumber: number;
}

const MemberTableItem = ({ member, itemNumber }: PropTypes) => {
  const navigate = useNavigate();

  const { id, name, sex, status, mainSkill, email } = member;
  const imageUrl = getMemberImage(name);

  const onGoToMemberDetail = () => {
    navigate(`/member/${id}`);
  };

  return (
    <Table.Row style={{ cursor: "pointer" }} onClick={onGoToMemberDetail}>
      <Table.Cell textAlign="center">{itemNumber}</Table.Cell>
      <Table.Cell>
        <Header as="h4" image>
          <Image src={imageUrl} rounded bordered size="big" />
          <Header.Content>{name}</Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>{sex}</Table.Cell>
      <Table.Cell>{mainSkill ? mainSkill : "n/a"}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>
        <MemberStatusItem memberStatus={status} />
      </Table.Cell>
    </Table.Row>
  );
};

export default MemberTableItem;
