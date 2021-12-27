import { useState, useEffect } from "react";
import {
  Button,
  Image,
  Grid,
  Header,
  Icon,
  List,
  Rating,
  Segment,
} from "semantic-ui-react";
import { Member } from "../../types/Member";
import { getMemberImage } from "../../services/ImageService";
import http from "../../util/httpCommon";
import { Link } from "react-router-dom";

const BACON_IPSUM_URI =
  "https://baconipsum.com/api/?type=all-meat&sentences=4&start-with-lorem=1";

interface PropTypes {
  member: Member;
}

const MemberItemDetails = (props: PropTypes) => {
  const [baconIpsum, setBaconIpsum] = useState<String[]>([]);

  let { skills, name, email, sex, mainSkill, status, id } = props.member;

  const imageUrl = getMemberImage(name);

  useEffect(() => {
    http.get(BACON_IPSUM_URI).then((response) => setBaconIpsum(response.data));
  }, []);

  const backgroundImage = `https://picsum.photos/id/${id}/765/160`;

  const styleImage = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "calc(100%) calc(100% - 145px)",
    backgroundSize: "765px 160px",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  };

  return (
    <div>
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
                  <Grid.Column>
                    <Header content="Skills" as="h2" />
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      as={Link}
                      to="/skills"
                      floated="right"
                      icon
                      circular
                    >
                      <Icon name="pencil" />
                    </Button>
                    <Button floated="right" icon circular>
                      <Icon name="plus" />
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <List divided relaxed>
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
              {status === "EXPIRED" && (
                <Icon color="grey" name="minus circle" />
              )}
              {status === "REDIRED" && (
                <Icon color="orange" name="stop circle" />
              )}
              {status}
              <Header sub dividing>
                Specialty:
              </Header>
              {mainSkill.toUpperCase()}
              <Header sub dividing>
                Heists:
              </Header>
              None yet
              <Header sub dividing>
                About:
              </Header>
              {baconIpsum}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default MemberItemDetails;
