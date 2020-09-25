# import statements
from azure.cognitiveservices.language.luis.authoring import LUISAuthoringClient
from msrest.authentication import CognitiveServicesCredentials
import datetime, json, os, time

# You will also require variables to store your key and endpoint.
authoring_key = 'DeletedForSecurityPurposes'
authoring_endpoint = 'https://chatbotdook-authoring.cognitiveservices.azure.com/'

# instantiate a LUIS client object and authenticate to the service
client = LUISAuthoringClient(authoring_endpoint, CognitiveServicesCredentials(authoring_key))

# This next function handles the work of creating the LUIS app with the client information
def create_app():
    # Create a new LUIS app
    app_name    = "PictureBotLUIS")
    app_desc    = "Picture Bot app built with LUIS Python SDK."
    app_version = "0.1"
    app_locale  = "en-us"

    app_id = client.apps.add(dict(name=app_name,
                                    initial_version_id=app_version,
                                    description=app_desc,
                                    culture=app_locale))

    print("Created LUIS app {}\n    with ID {}".format(app_name, app_id))

    add_intents(app_id, app_version)
    return app_id, app_version

    create_app()


# new function to add intents to the LUIS app
def add_intents(app_id, app_version):
    intents = ["Greeting", "SearchOpp", "OrderOpp", "ShareOpp"]
    for intent in intents:
        intentId = client.model.add_intent(app_id, app_version, intent)
        print("Intent {} {} added.".format(intent, intentId))

add_entities(app_id, app_version)

# Create a function to add the entity to the LUIS app.
def add_entities(app_id, app_version):

    facetEntityId = client.model.add_entity(app_id, app_version, name="facet")
    print("facetEntityId {} added.".format(facetEntityId))

    # Helper function for creating the utterance data structure.
# <createUtterance>
def create_utterance(intent, utterance, *labels):

    text = utterance.lower()

    def label(name, value):
        value = value.lower()
        start = text.index(value)
        return dict(entity_name=name, start_char_index=start,
                    end_char_index=start + len(value))

    return dict(text=text, intent_name=intent,
                entity_labels=[label(n, v) for (n, v) in labels])

# Helper function for creating the utterance data structure.
# </createUtterance>
def add_utterances(app_id, app_version):
    # Now define the utterances
    utterances = [create_utterance("SearchOpp", "find opportunities",
                           ("facet", "opportunities")),

                create_utterance("SearchOpp", "are there opportunities?",
                            ("facet", "opportunities")),

                create_utterance("SearchOpp", "find pictures opportunities",
                            ("facet", "opportunities")),

                create_utterance("SearchOpp", "search for opportunities",
                            ("facet", "opportunities")),

                create_utterance("SearchOpp", "give me opportunities",
                            ("facet", "opportunities")),

                create_utterance("SearchOpp", "show me internships",
                            ("facet", "internships")),

                create_utterance("SearchOpp", "I want to find internships",
                            ("facet", "internships")),

                create_utterance("SearchOpp", "find internships",
                            ("facet", "internships")),

                create_utterance("SearchOpp", "search for internships",
                            ("facet", "internships")),

                create_utterance("SearchOpp", "show me conferences",
                            ("facet", "conferences")),

                create_utterance("SearchOpp", "I want to see conferences",
                            ("facet", "conferences")),

                create_utterance("SearchOpp", "show me events",
                            ("facet", "events"))]

    # Add the utterances in batch. You may add any number of example utterances
    # for any number of intents in one call.
    client.examples.batch(app_id, app_version, utterances)
    print("{} example utterance(s) added.".format(len(utterances)))

    # Entrenar
    def train_app(app_id, app_version):
    response = client.train.train_version(app_id, app_version)
    waiting = True
    while waiting:
        info = client.train.get_status(app_id, app_version)

        # get_status returns a list of training statuses, one for each model. Loop through them and make sure all are done.
        waiting = any(map(lambda x: 'Queued' == x.details.status or 'InProgress' == x.details.status, info))
        if waiting:
            print ("Waiting 10 seconds for training to complete...")
            time.sleep(10)


    # Publicar App después de Entrenar
    def publish_app(app_id, app_version):
    responseEndpointInfo = client.apps.publish(app_id, app_version, is_staging=True)
    print("Application published. Endpoint URL: " + responseEndpointInfo.endpoint_url)