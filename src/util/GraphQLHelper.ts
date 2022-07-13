import { Dictionary } from "../interfaces";

// @ts-ignore
const flattenObjectToQueryString = (
  updateObject: any,
  passedInUpdateKey?: string,
  forceFetchString?: string,
): string => {
  // Baseline case of flattening where the object is not an object
  if (!isObjectAnObject(updateObject) && passedInUpdateKey) {
    return passedInUpdateKey as string;
  }

  // Cast the update object into a dictionary since we know it is an object aka dictionary
  const updateObjectDictionary = updateObject as Dictionary;

  // Pull out the items in the update object and begin processing
  const updateKeys = Object.keys(updateObjectDictionary);
  let updateString = '';

  // If the passed in update key exists, but the object is not a string, then add the key to the return string
  if (passedInUpdateKey) {
    if (passedInUpdateKey === 'answers') {
      updateString += 'answers(answerId: #replaceId)\n';
    } else if (passedInUpdateKey === 'mobilityAids') {
      updateString += 'mobilityAids(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'wellbeingIssues') {
      updateString += 'wellbeingIssues(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'internalDevices') {
      updateString += 'internalDevices(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'intractableInfectionOrIllnesses') {
      updateString += 'intractableInfectionOrIllnesses(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'diabetesResponses') {
      updateString += 'diabetesResponses(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'immunosuppressiveConditions') {
      updateString += 'immunosuppressiveConditions(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'medications') {
      updateString += 'medications(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'allergies') {
      updateString += 'allergies(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'operations') {
      updateString += 'operations(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'treatment') {
      updateString += 'updateTreatment(treatmentId: #replaceId)\n';
    } else if (passedInUpdateKey === 'reaction') {
      updateString += 'updateReaction(reactionId: #replaceId)\n';
    } else if (passedInUpdateKey === 'cancer') {
      updateString += 'cancer(id: #replaceId)\n';
    } else if (passedInUpdateKey === 'otherRadiotherapyConditions') {
      updateString += 'otherRadiotherapyConditions(id: #replaceId)\n';
    } else {
      updateString += `${passedInUpdateKey}\n`;
    }
  }
  updateString += '{\n';
  updateString += 'id\n';
  for (const updateKey of updateKeys) {
    if (updateKey !== 'id') {
      updateString += flattenObjectToQueryString(updateObjectDictionary[updateKey], updateKey);
      updateString += '\n';
    }
  }
  if (forceFetchString) {
    updateString += forceFetchString + '\n';
  }
  updateString += '}';
  return updateString;
};

// @ts-ignore
const mapObjectToMutationParams = (updateObject: any): string => {
  let mutationParam = '';
  // Go through the keys that exist on the first level object and map them to different types
  const updateEntries = Object.entries(updateObject);
  mutationParam = updateEntries
    .map((updateEntry): string => {
      const [updateKey, updateValue] = updateEntry;

      if (updateKey === 'haId' || updateKey === 'patientId') {
        return `$${updateKey}: ID!`;
      }

      if ((updateKey === 'id' || updateKey === 'relatedObjectId') && typeof updateValue === 'string') {
        return `$${updateKey}: ID!`;
      }

      if (updateKey === 'emergencyContact' || updateKey === 'nextOfKinContact') {
        return `$${updateKey}: AlternateContactInputType!`;
      }

      // Add the answer type
      if (updateKey === 'answers') {
        return `$${updateKey}: DTCheckboxAnswerMutationType!`;
      }

      // Add the health assessment types
      if (updateKey === 'mobilityAids') {
        return `$${updateKey}: MobilityAidMutationType!`;
      }

      if (updateKey === 'wellbeingIssues') {
        return `$${updateKey}: WellbeingIssueMutationType!`;
      }
      if (updateKey === 'internalDevices') {
        return `$${updateKey}: InternalDeviceMutationType!`;
      }
      if (updateKey === 'intractableInfectionOrIllnesses') {
        return `$${updateKey}: IntractableInfectionOrIllnessMutationType!`;
      }
      if (updateKey === 'diabetesResponses') {
        return `$${updateKey}: DiabetesResponsesMutationType!`;
      }
      if (updateKey === 'immunosuppressiveConditions') {
        return `$${updateKey}: ImmunosuppressiveConditionMutationType!`;
      }
      if (updateKey === 'medications') {
        return `$${updateKey}: MedicationMutationType!`;
      }
      if (updateKey === 'allergies') {
        return `$${updateKey}: AllergyMutationType!`;
      }
      if (updateKey === 'operations') {
        return `$${updateKey}: OperationMutationType!`;
      }

      if (updateKey === 'otherRadiotherapyConditions') {
        return `$${updateKey}: OtherRadiotherapyConditionMutationType!`;
      }
      if (updateKey === 'cancer') {
        return `$${updateKey}: CancerMutationType!`;
      }

      const typeOfObject = typeof updateValue;
      let typeString = 'String!';
      if (typeOfObject === 'boolean') typeString = 'Boolean!';
      if (typeOfObject === 'number') typeString = 'Int!';
      // If the update key is an id then the return type is always a graphql ID!
      if (updateKey === 'id') typeString = 'ID!';

      return `$${updateKey}: ${typeString}`;
    })
    .join(', ');

  return mutationParam;
};

//@ts-ignore
const mapObjectToFunctionParams = (updateObject: any): string => {
  let functionParams = '';

  const updateKeys = Object.keys(updateObject);
  functionParams = updateKeys
    .map((updateKey): string => {
      return `${updateKey}: $${updateKey}`;
    })
    .join(', ');

  return functionParams;
};

const isObjectAnObject = (objectToCheck: object | string): boolean => {
  const typeOfObject = typeof objectToCheck;
  return typeOfObject === 'object' && typeOfObject !== null;
};

export { flattenObjectToQueryString, mapObjectToFunctionParams, mapObjectToMutationParams };
