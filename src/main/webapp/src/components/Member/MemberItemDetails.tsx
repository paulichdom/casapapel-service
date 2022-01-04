import {
  Button,
  Image,
  Grid,
  Header,
  Icon,
  List,
  Rating,
  Segment,
  Message,
} from "semantic-ui-react";
import { Member } from "../../types/Member";
import { getMemberImage } from "../../services/ImageService";
import { Link } from "react-router-dom";

interface PropTypes {
  member: Member;
  aboutText: String[];
}

const MemberItemDetails = (props: PropTypes) => {
  let { skills, name, email, sex, mainSkill, status, id } = props.member;

  const imageUrl = getMemberImage(name);

  const backgroundImage = `https://picsum.photos/id/${id}/765/160`;

  const styleImage = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "calc(100%) calc(100% - 145px)",
    backgroundSize: "765px 160px",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  };

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={11}>
          <Segment padded style={styleImage}>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Image
                    src={imageUrl.href}
                    circular
                    bordered
                    size="small"
                    style={{ backgroundColor: "white" }}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1">
                    {name}
                    <Header.Subheader>Sex: {sex}</Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column style={{ paddingLeft: "6rem" }}>
                  <List>
                    <List.Item>
                      <List.Icon name="users" />
                      <List.Content>Casa Papel</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="marker" />
                      <List.Content>A State, ST</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="mail" />
                      <List.Content>
                        <a href={`mailto:${email}`}>{email}</a>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment padded style={{ borderRadius: "10px" }}>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column verticalAlign="bottom">
                  <h2>Skills</h2>
                </Grid.Column>
                <Grid.Column>
                  <Button as={Link} to="skills" floated="right" icon circular>
                    <Icon name="pencil" />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <List divided relaxed>
              {skills.length === 0 && (
                <Message
                  info
                  header={`${name}'s skill list is empty`}
                  content="Click on the edit icon in the upper right corner to add new skills"
                />
              )}
              {skills.map((skill) => (
                <List.Item key={skills.indexOf(skill)}>
                  <Header as="h3" style={{ marginBottom: "10px" }}>
                    {skill.name}
                  </Header>
                  <Rating
                    rating={skill.level.length}
                    maxRating={10}
                    disabled
                    icon="star"
                    style={{ marginRight: "10px" }}
                  />{" "}
                  {`${skill.level.length}/10`}
                </List.Item>
              ))}
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment padded style={{ borderRadius: "10px" }} textAlign="left">
            <Header sub dividing>
              Status:
            </Header>
            {status === "AVAILABLE" && (
              <Icon color="green" name="check circle" />
            )}
            {status === "INCARCERATED" && (
              <Icon color="red" name="times circle" />
            )}
            {status === "EXPIRED" && <Icon color="grey" name="minus circle" />}
            {status === "REDIRED" && <Icon color="orange" name="stop circle" />}
            {status}
            <Header sub dividing>
              Specialty:
            </Header>
            {mainSkill ? mainSkill.toUpperCase() : "None"}
            <Header sub dividing>
              Heists:
            </Header>
            None yet
            <Header sub dividing>
              About:
            </Header>
            {props.aboutText}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default MemberItemDetails;
