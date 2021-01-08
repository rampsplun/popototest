import provider from "../../src/provider/provider";
import query from '../../src/query/query.js'
import dataModel from "../../src/datamodel/dataModel";

describe("one branch", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node",
                type: 1,
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("WHERE (NOT exists (path-to-branch))", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});

describe("one branch with one value", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node",
                type: 1,
                value: [{label: "Node", attributes: {Nid: "Vid", Nname: "Vname"}}],
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("WHERE (NOT exists (path-to-branch-with-value))", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});

describe("one branch with two value", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node",
                type: 1,
                value: [
                    {label: "Node", attributes: {Nid: "Vid", Nname: "Vname"}},
                    {label: "Node", attributes: {Nid: "Vid2", Nname: "Vname2"}}
                ],
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("WHERE (NOT exists (path-to-branch-with-value))", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});

describe("one long-branch", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node1",
                type: 1,
            },
            {
                id: 3,
                label: "Node",
                internalLabel: "node2",
                type: 1,
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO1",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            },
            {
                id: 2,
                label: "LINKED_TO2",
                source: dataModel.nodes[1],
                target: dataModel.nodes[2],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("WHERE (NOT exists (path-to-long-branch))", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});

describe("one long-branch with value leaf", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node1",
                type: 1,
            },
            {
                id: 3,
                label: "Node",
                internalLabel: "node2",
                value: [{label: "Node", attributes: {Nid: "Vid", Nname: "Vname"}}],
                type: 1,
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO1",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            },
            {
                id: 2,
                label: "LINKED_TO2",
                source: dataModel.nodes[1],
                target: dataModel.nodes[2],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("WHERE (NOT exists (path-to-long-branch-with-value))", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});

describe("one long-branch with value mid", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node1",
                value: [{label: "Node", attributes: {Nid: "Vid", Nname: "Vname"}}],
                type: 1,
            },
            {
                id: 3,
                label: "Node",
                internalLabel: "node2",
                type: 1,
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO1",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            },
            {
                id: 2,
                label: "LINKED_TO2",
                source: dataModel.nodes[1],
                target: dataModel.nodes[2],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("WHERE (NOT exists (path-to-long-branch-with-value))", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});

describe("one long-branch with value mid and leaf", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node1",
                value: [{label: "Node", attributes: {Nid: "Vid", Nname: "Vname"}}],
                type: 1,
            },
            {
                id: 2,
                label: "Node",
                internalLabel: "node2",
                value: [{label: "Node", attributes: {Nid: "Vid2", Nname: "Vname2"}}],
                type: 1,
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO1",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            },
            {
                id: 2,
                label: "LINKED_TO2",
                source: dataModel.nodes[1],
                target: dataModel.nodes[2],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("WHERE (NOT exists (path-to-long-branch-with-value))", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});

describe("one long-branch with NOT value mid", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node1",
                value: [{label: "Node", attributes: {Nid: "Vid", Nname: "Vname"}}],
                isNegative: true,
                type: 1,
            },
            {
                id: 3,
                label: "Node",
                internalLabel: "node2",
                type: 1,
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO1",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            },
            {
                id: 2,
                label: "LINKED_TO2",
                source: dataModel.nodes[1],
                target: dataModel.nodes[2],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("WHERE (NOT exists (path-to-long-branch-with-value))", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});

describe("one very long-branch with value leaf and reverse order", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Label1",
                internalLabel: "label1",
                isNegative: false,
                type: 1,
            },
            {
                id: 2,
                label: "Label2",
                isParentRelReverse: true,
                internalLabel: "label2",
                type: 1,
            },
            {
                id: 3,
                label: "Label3",
                internalLabel: "label3",
                value: [{label: "Label3", attributes: {Nid: "Vid3", Nname: "Vname3"}}],
                type: 1,
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO1",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            },
            {
                id: 2,
                label: "LINKED_TO2",
                source: dataModel.nodes[1],
                target: dataModel.nodes[2],
                type: 1
            },
            {
                id: 2,
                label: "LINKED_TO3",
                source: dataModel.nodes[2],
                target: dataModel.nodes[3],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Label1": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            },
            "Label2": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            },
            "Label3": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("generation", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});


describe("one branch generateNegativeNodeValueConstraints", function () {
    beforeEach(() => {
        dataModel.nodes = [
            {
                id: 0,
                label: "Root",
                internalLabel: "root",
                type: 0
            },
            {
                id: 1,
                label: "Node",
                internalLabel: "node",
                type: 1,
                isNegative: true
            }
        ];

        dataModel.links = [
            {
                id: 1,
                label: "LINKED_TO",
                source: dataModel.nodes[0],
                target: dataModel.nodes[1],
                type: 1
            }
        ];

        provider.node.Provider = {
            "Root": {
                returnAttributes: ["name", "id"],
                constraintAttribute: "id",
            },
            "Node": {
                returnAttributes: ["Nname", "Nid"],
                constraintAttribute: "Nid",
                generateNegativeNodeValueConstraints: function (node) {
                    return {
                        whereElements: [
                            "(NOT exists (root)-[]->())"
                        ],
                        parameters: {
                            customParam: "Custom Param Value"
                        }
                    }
                },
            }
        };
    });

    afterEach(() => {
        delete provider.node.Provider;
    });

    test("generateResultQuery", () => {
        var generateResultQuery = query.generateResultQuery(false);
        expect(generateResultQuery.statement).toMatchSnapshot();
        expect(generateResultQuery.parameters).toMatchSnapshot();
    });
});
