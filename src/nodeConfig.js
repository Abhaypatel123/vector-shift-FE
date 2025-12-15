import { FaSignInAlt, FaSignOutAlt, FaFont, FaBrain, FaDatabase, FaFile } from "react-icons/fa";
import { MdSpeakerNotes, MdOutlineSupportAgent, MdExtension } from "react-icons/md";
import { BaseNode } from "./components/BaseNode";

export const nodeConfigs = {
  customInput: {
    label: "Input",
    type: "input",
    icon: <FaSignInAlt />,
    fields: [
      { name: "name", label: "Name", type: "text", default: "input_1" },
      { name: "type", label: "Type", type: "select", options: ["Text", "File"], default: "Text" },
    ],
    handles: [{ type: "source", position: "Right", id: "{id}-value" }],
  },

  llm: {
    label: "LLM",
    type: "llm",
    icon: <FaBrain />,
    fields: [],
    handles: [
      { type: "target", position: "Left", id: "system", style: { top: "33%" } },
      { type: "target", position: "Left", id: "prompt", style: { top: "66%" } },
      { type: "source", position: "Right", id: "response" },
    ],
  },

  customOutput: {
    label: "Output",
    type: "output",
    icon: <FaSignOutAlt />,
    fields: [
      { name: "name", label: "Name", type: "text", default: "output_1" },
      { name: "type", label: "Type", type: "select", options: ["Text", "Image"], default: "Text" },
    ],
    handles: [{ type: "target", position: "Left", id: "value" }],
  },

  text: {
    label: "Text",
    type: "text",
    icon: <FaFont />,
    fields: [
      { name: "name", label: "Name", type: "text", default: "text_1" },
      { name: "text", label: "Text", type: "text", default: "" }
    ],
    handles: [{ type: "source", position: "Right", id: "output" }],
  },

  database: {
    label: "Database",
    type: "database",
    icon: <FaDatabase />,
    fields: [
      { name: "table", label: "Table", type: "text", default: "users" },
    ],
    handles: [
      { type: "source", position: "Right", id: "rows" },
    ],
  },

  notes: {
    label: "Notes",
    type: "notes",
    icon: <MdSpeakerNotes />,
    fields: [
      // { name: "name", label: "Name", type: "text", default: "text_1" },
      { name: "textarea", label: "Enter Value", type: "textarea", default: "", rows: 8 }
    ],
    handles: [
      { type: "target", position: "left", id: "rows" },
    ],
  },

  // math: {
  //   label: "Math",
  //   type: "math",
  //   icon: "∑", // simple text fallback
  //   fields: [
  //     { name: "expression", label: "Expression", type: "text", default: "a + b" },
  //   ],
  //   handles: [
  //     { type: "target", position: "Left", id: "input" },
  //     { type: "source", position: "Right", id: "result" },
  //   ],
  // },

  // extension: {
  //   label: "Extension",
  //   type: "extension",
  //   icon: <MdExtension />,
  //   fields: [
  //     { name: "url", label: "URL", type: "text", default: "https://api.example.com" },
  //     { name: "method", label: "Method", type: "select", options: ["GET", "POST"], default: "GET" },
  //   ],
  //   handles: [
  //     { type: "target", position: "Left", id: "req" },
  //     { type: "source", position: "Right", id: "res" },
  //   ],
  // },

  // delay: {
  //   label: "Agent",
  //   type: "agent",
  //   icon: <MdOutlineSupportAgent />,
  //   fields: [{ name: "ms", label: "Milliseconds", type: "text", default: "1000" }],
  //   handles: [
  //     { type: "target", position: "Left", id: "in" },
  //     { type: "source", position: "Right", id: "out" },
  //   ],
  // },

  // file: {
  //   label: "File",
  //   type: "file",
  //   icon: <FaFile  />,
  //   fields: [{ name: "msg", label: "Message", type: "text", default: "Hello" }],
  //   handles: [
  //     { type: "target", position: "Left", id: "input" },
  //   ],
  // },


  // condition: {
  //   label: "Condition",
  //   icon: "⚖️",
  //   fields: [
  //     { name: "expr", label: "Condition", type: "text", default: "x > 10" },
  //   ],
  //   handles: [
  //     { type: "target", position: "Left", id: "input" },
  //     { type: "source", position: "Right", id: "true" },
  //     { type: "source", position: "Right", id: "false", style: { top: "70%" } },
  //   ],
  // },
};

export const nodeTypes = Object.keys(nodeConfigs).reduce((acc, key) => {
  acc[key] = (props) => <BaseNode {...props} config={nodeConfigs[key]} />;
  return acc;
}, {});


export const NODE_TYPES = Object.entries(nodeConfigs).map(([type, config]) => ({
  type,
  label: config.label,
  icon: config.icon,
}));
