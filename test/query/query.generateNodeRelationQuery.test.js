import provider from "../../src/provider/provider";
import query from '../../src/query/query.js'
import dataModel from "../../src/datamodel/dataModel";

describe("node relation query", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Person",
                internalLabel: "person",
                type: 0
            },
            {
                id: 1,
                label: "Movie",
                internalLabel: "movie",
                type: 1
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "ACTED_IN",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Person": {
                returnAttributes: ["name", "born"],
                constraintAttribute: "name",
            },
            "Movie": {
                returnAttributes: ["title", "born"],
                constraintAttribute: "title",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
        query.USE_PARENT_RELATION = false;
    });

    test("Person", () => {
        var nodeRelationQuery = query.generateNodeRelationQuery(dataModel.nodes[0]);
        expect(nodeRelationQuery.statement).toMatchSnapshot();
        expect(nodeRelationQuery.parameters).toMatchSnapshot();

        query.USE_PARENT_RELATION = true;
        nodeRelationQuery = query.generateNodeRelationQuery(dataModel.nodes[0]);
        expect(nodeRelationQuery.statement).toMatchSnapshot();
        expect(nodeRelationQuery.parameters).toMatchSnapshot();
    });

    test("Movie", () => {
        var nodeRelationQuery = query.generateNodeRelationQuery(dataModel.nodes[1]);
        expect(nodeRelationQuery.statement).toMatchSnapshot();
        expect(nodeRelationQuery.parameters).toMatchSnapshot();

        query.USE_PARENT_RELATION = true;
        nodeRelationQuery = query.generateNodeRelationQuery(dataModel.nodes[1]);
        expect(nodeRelationQuery.statement).toMatchSnapshot();
        expect(nodeRelationQuery.parameters).toMatchSnapshot();
    });
});

describe("node relation query with values", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Person",
                internalLabel: "person",
                value: [{label: "Person", attributes: {name: "Jhon", born: 1980}}],
                type: 0
            },
            {
                id: 1,
                label: "Movie",
                internalLabel: "movie",
                type: 1
            },
            {
                id: 2,
                label: "Person",
                internalLabel: "person1",
                type: 1
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "ACTED_IN",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            },
            {
                id: 1,
                label: "FOLLOW",
                source: dataModel.nodes[0],
                target: dataModel.nodes[2],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Person": {
                returnAttributes: ["name", "born"],
                constraintAttribute: "name",
                getPredefinedConstraints: function () {
                    return ["$identifier.born >= 1980"];
                }
            },
            "Movie": {
                returnAttributes: ["title", "born"],
                constraintAttribute: "title",
            }
        };

        query.USE_RELATION_DIRECTION = false;
    });

    afterEach(() => {
        delete provider.node.Provider;
        query.USE_RELATION_DIRECTION = true;
    });

    test("Person", () => {
        var nodeRelationQuery = query.generateNodeRelationQuery(dataModel.nodes[2]);
        expect(nodeRelationQuery.statement).toMatchSnapshot();
        expect(nodeRelationQuery.parameters).toMatchSnapshot();
    });
});