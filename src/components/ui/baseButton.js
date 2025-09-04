import { defineComponent, h } from "vue";
import { VBtn } from "vuetify/components";

export const BaseButton = defineComponent({
  name: "BaseButton",
  render() {
    return h(
      VBtn,
      {
        style: {
          color: "#fff",
          background: "linear-gradient(90deg, #ff5900, #ff8e42)",
        },
        onClick: this.$attrs.onClick, 
      },
      {
        default: () => this.$slots.default?.() || [], 
      }
    );
  },
});

export const TextButton = defineComponent({
  name: "TextButton",
  props: {
    color: {
      type: String,
      default: "#ff0000",
    },
  },
  render() {
    return h(
      VBtn,
      {
        style: {
          color: this.color,
          border: `1px solid ${this.color}`,
          padding: "5px 10px",
          width: "100%",
          fontWeight: "400",
          fontSize: "14px",
        },
        variant: "text",
        ...this.$attrs, 
      },
      {
        default: () => this.$slots.default?.() || [], 
      }
    );
  },
});