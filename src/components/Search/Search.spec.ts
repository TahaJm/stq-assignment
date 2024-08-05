import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import SearchComponent from './SearchComponent.vue'
import { MINIMUM_SEARCH_CHARACTER } from '@/constants/configs'

describe('SearchComponent', () => {
  let wrapper: any

  const defaultProps = {
    value: '',
    label: 'Search',
    placeholder: 'Type to search...',
    query: '',
    results: [],
    getResultKey: (result: any) => result.id,
    onChange: vi.fn(), // Mocking the onChange function
  }

  beforeEach(() => {
    wrapper = mount(SearchComponent, {
      props: defaultProps,
      slots: {
        default: '<template #default="{ result }"><div>{{ result.name }}</div></template>'
      }
    })
  })

  it('renders the input field with the correct label and placeholder', () => {
    expect(wrapper.find('label').text()).toBe(defaultProps.label)
    expect(wrapper.find('input').attributes('placeholder')).toBe(defaultProps.placeholder)
  })


  it('shows the results container when the input is focused', async () => {
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.find('.results-container').classes()).toContain('visible')

  })

  it('displays "Type at least 3 characters" when query length is less than minimum', async () => {
    await wrapper.setProps({ query: 'te' })
    expect(wrapper.find('.results-container').text()).toContain(`Type at least ${MINIMUM_SEARCH_CHARACTER} characters`)
  })

  it('displays "No results found" when there are no results and query length is sufficient', async () => {
    await wrapper.setProps({ query: 'test', results: [] })
    expect(wrapper.find('.results-container').text()).toContain('No results found')
  })

  it('displays the results when there are matching results', async () => {
    const results = [{ id: 1, name: 'Result 1' }, { id: 2, name: 'Result 2' }]
    await wrapper.setProps({ query: 'test', results })

    const resultItems = wrapper.findAll('li')
    expect(resultItems.length).toBe(results.length)
    expect(resultItems[0].text()).toBe(results[0].name)
    expect(resultItems[1].text()).toBe(results[1].name)
  })

  it('emits select event when a result is clicked', async () => {
    const results = [{ id: 1, name: 'Result 1' }]
    await wrapper.setProps({ query: 'test', results })

    const resultItem = wrapper.find('li')
    await resultItem.trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0]).toEqual([results[0]])
  })
})
