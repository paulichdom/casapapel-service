import React from "react";
import { Table } from "semantic-ui-react";
import { Member } from "../../types/Member";
import MemberTableItem from "./MemberTableItem";

interface PropTypes {
  memberList: Member[];
}

const MemberTable = ({ memberList }: PropTypes) => {
  return (
    <Table
      padded
      singleLine
      selectable
      size="large"
      stylr={{ backgoundColor: "white" }}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">#</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Sex</Table.HeaderCell>
          <Table.HeaderCell>Specialty</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {memberList.map((member, index) => (
          <MemberTableItem key={member.id} member={member} itemNumber={index + 1}/>
        ))}
      </Table.Body>
    </Table>
  );
};

export default MemberTable;
