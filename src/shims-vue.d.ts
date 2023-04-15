declare module '*.vue' {
  import { defineComponent } from 'vue';

  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare global {
  // With vue@2.7, DefineComponent is not considered a valid argument for mount and shallowMount
  declare module '@vue/test-utils' {
    import type Vue from 'vue';
    import type { Component } from 'vue';
    import type { ThisTypedShallowMountOptions, ThisTypedMountOptions } from '@vue/test-utils';

    export declare function shallowMount<C extends Component>(
      component: C,
      options?: ThisTypedShallowMountOptions<Vue>
    ): Wrapper<Vue>;

    export declare function mount<C extends Component>(
      component: C,
      options?: ThisTypedMountOptions<Vue>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Wrapper<any>;
  }
}
