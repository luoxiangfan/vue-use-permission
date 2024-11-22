import { computed, shallowRef } from 'vue';
import type { Ref } from 'vue';
import type { IPermissionDescriptor } from './types.js';

export type UsePermissionReturn = Readonly<Ref<PermissionState | undefined>>;

function usePermission(
  permissionDescriptor: IPermissionDescriptor | IPermissionDescriptor['name']
): UsePermissionReturn {
  const desc =
    typeof permissionDescriptor === 'string'
      ? ({ name: permissionDescriptor } as PermissionDescriptor)
      : (permissionDescriptor as PermissionDescriptor);
  const state = shallowRef<PermissionState | undefined>();
  const permissionStatus = shallowRef<PermissionStatus>();
  const isSupported = computed(() => navigator && 'permissions' in navigator);
  const update = () => {
    state.value = permissionStatus.value?.state ?? 'prompt';
  };

  if (permissionStatus.value?.onchange) {
    permissionStatus.value.onchange = update;
  }

  const query = async () => {
    if (!isSupported.value) {
      return;
    }
    if (!permissionStatus.value) {
      try {
        permissionStatus.value = await navigator.permissions.query(desc);
      } catch {
        permissionStatus.value = undefined;
      } finally {
        update();
      }
    }
  };
  query();
  return state as UsePermissionReturn;
}

export default usePermission;
