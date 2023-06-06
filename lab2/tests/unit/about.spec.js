import { shallowMount } from "@vue/test-utils";
import AboutPage from "@/views/AboutPage.vue";
import { router } from "@/router/router";
import farawayLogo from "@/assets/faraway.png";

describe("AboutPage", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(AboutPage, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("renders the quick links", () => {
    const wrapper = shallowMount(AboutPage, {
      global: {
        plugins: [router],
      },
    });

    const quickLinks = wrapper.findAll(".quick-links li");
    expect(quickLinks.length).toBe(5);
  });

  it("renders the image", () => {
    const wrapper = shallowMount(AboutPage, {
      global: {
        plugins: [router],
      },
      propsData: {
        logoSrc: farawayLogo,
      },
    });

    const image = wrapper.find("img");
    expect(image.exists()).toBe(true);
    expect(image.attributes("src")).toBe(farawayLogo);
  });

  it("renders the about section", () => {
    const wrapper = shallowMount(AboutPage, {
      global: {
        plugins: [router],
      },
    });

    const aboutSection = wrapper.find(".page-section-heading");
    expect(aboutSection.exists()).toBe(true);
    expect(aboutSection.text()).toBe("About");
  });

  it("renders the lead text", () => {
    const wrapper = shallowMount(AboutPage, {
      global: {
        plugins: [router],
      },
    });

    const leadText = wrapper.find(".lead");
    expect(leadText.exists()).toBe(true);
    expect(leadText.text()).toContain("Faraway");
  });

  it("renders the social media links", () => {
    const wrapper = shallowMount(AboutPage, {
      global: {
        plugins: [router],
      },
    });

    const socialLinks = wrapper.findAll(".social li");
    expect(socialLinks.length).toBe(1);
  });

  it("renders the copyright information", () => {
    const wrapper = shallowMount(AboutPage, {
      global: {
        plugins: [router],
      },
    });
    const copyright = wrapper.find("div.copyright");
    expect(copyright.exists()).toBe(true);
    expect(copyright.text()).toBe("Copyright © farawaystudy.com 2023");
  });
});
