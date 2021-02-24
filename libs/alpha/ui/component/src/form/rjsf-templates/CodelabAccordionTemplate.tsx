import React from 'react';
import { Collapse } from 'antd';

export interface IAccordion {
	title: string,
	fields: string[]
}

export const CodelabAccordionTemplate = (props: any) => {
	const {
		TitleField,
		DescriptionField,
		uiSchema,
		idSchema,
		required,
		disabled,
		readonly,
		formData,
		formContext,
		properties,
		schema
	} = props

	const findContent = (name: string) => {
		return properties.find((prop: any) => {
			return prop.name === name
		})
	}

	const layout: IAccordion[] = uiSchema['ui:groups']

	return (
		<fieldset id={props.idSchema.$id}>
			{(props.uiSchema["ui:title"] || props.title) && (
				<TitleField
					id={`${props.idSchema.$id}__title`}
					title={props.title || props.uiSchema["ui:title"]}
					required={props.required}
					formContext={props.formContext}
				/>
			)}
			{props.description && (
				<DescriptionField
					id={`${props.idSchema.$id}__description`}
					description={props.description}
					formContext={props.formContext}
				/>
			)}
			<Collapse defaultActiveKey="0" key="accordion">
				{
					layout?.map((row, index) => {
						return (
							<Collapse.Panel header={row.title} key={index}>
								{
									row.fields.map((field: string) => {
										if (schema.properties[field]) {
											const element = findContent(field)
											return (
												<div>
													{element.content}
												</div>
											)
										}
									})
								}
							</Collapse.Panel>
						)
					})
				}
			</Collapse>
		</fieldset>
	)
}
