// import regiscomp from '@/components/addcaridk.vue';
//
// import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
//
// const localVue = createLocalVue()
//
// describe('Register.vue', () => {
//   test('Garantizar que los datos de un usuario se registren en el sistema', () => {
//     let reg;
//
//     reg = shallowMount(regiscomp);
//
//     reg.setData({ username: "Foo", name: "Fernando", email: "foo@mail.com", date: "03/04/2019", password: "foosword", confirm: "foosword"});
//
//     const wrapper = mount(regiscomp);
//     const vm = wrapper.vm;
//     wrapper.find('button').trigger('click');
//     // // DESPUES DE DAR CLICK
//     expect(vm.resp).toBe(true);
//   });
// });
import regiscomp from '@/components/addcaridk.vue';

import { shallowMount, mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue()

describe('login.vue', () => {
  test('Garantizar que el login ejecuta la autenticacion correctamente, en base a la respuesta de la api', () => {
    let reg;

    reg = shallowMount(regiscomp);

    reg.setData({ user: " ", password: " "});

    const wrapper = mount(regiscomp);
    const vm = wrapper.vm;
    wrapper.find('button').trigger('click');
    // // DESPUES DE DAR CLICK
    expect(vm.success).toBe(true);
  });
});
